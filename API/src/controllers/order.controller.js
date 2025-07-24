import {BLUE, RED, RESET} from "../lib/terminalColors.js";
import Order from "../models/order.model.js";
import Address from "../models/address.model.js";
import Discount from "../models/discount.model.js";
import Status from "../models/status.model.js";
import Article from "../models/article.model.js";
import History from "../models/history.model.js";
import Stripe from "stripe";

export const getMyOrders = async (req, res) => {
  try {
    res
      .status(200)
      .json(await Order.find({client: req.user._id}).populate("status"));
  } catch (error) {
    console.log(
      `${RED}Error in ${BLUE}Order.getMyOrders()${RED} function : ${RESET}`,
      error
    );
    res.status(500).json({message: error});
  }
};

export const getAllOrders = async (req, res) => {
  try {
    res
      .status(200)
      .json(await Order.find().populate("status").populate("client"));
  } catch (error) {
    console.log(
      `${RED}Error in ${BLUE}Order.getAllOrders()${RED} function : ${RESET}`,
      error
    );
    res.status(500).json({message: error});
  }
};

export const getMyOrderDetails = async (req, res) => {
  try {
    const {id} = req.params;
    const order = await Order.findById(id)
      .populate("status")
      .populate("articles.article")
      .populate("histories")
      .populate("address_billing")
      .populate("address_delivery")
      .populate("discount");
    if (!order.client.equals(req.user._id))
      return res.status(401).json({message: "You can only get yours orders."});
    return res.status(200).json({order});
  } catch (error) {
    console.log(
      `${RED}Error in ${BLUE}Order.getMyOrderDetails()${RED} function : ${RESET}`,
      error
    );
    res.status(500).json({message: error});
  }
};

export const getOrderDetails = async (req, res) => {
  try {
    const {id} = req.params;
    const order = await Order.findById(id)
      .populate("status")
      .populate("articles.article")
      .populate("histories")
      .populate("address_billing")
      .populate("address_delivery")
      .populate("discount")
      .populate("client");

    return res.status(200).json(order);
  } catch (error) {
    console.log(
      `${RED}Error in ${BLUE}Order.getOrderDetails()${RED} function : ${RESET}`,
      error
    );
    res.status(500).json({message: error});
  }
};

export const patchDeliveryCode = async (req, res) => {
  try {
    const {id} = req.params;
    const {delivery_code} = req.body;
    const order = await Order.findByIdAndUpdate(
      id,
      {delivery_code},
      {new: true}
    );
    return res.status(200).json({order});
  } catch (error) {
    console.log(
      `${RED}Error in ${BLUE}Order.patchDeliveryCode()${RED} function : ${RESET}`,
      error
    );
    res.status(500).json({message: error});
  }
};

export const makeOrder = async (req, res) => {
  try {
    const {address_delivery, address_billing, articles, discount} = req.body;

    if (!articles || !articles.length)
      return res
        .status(400)
        .json({message: "An Order needs at least one article."});

    let orderToSave = new Order({
      code: null,
      delivery_code: null,
      client: req.user,
      address_delivery: null,
      address_billing: null,
      status: null,
      histories: [],
      articles: [],
      discount: null,
    });
    // ADDRESSES
    //Search for existing address to evoid redondance
    let addressDelivExist = await Address.findOne({
      street: address_delivery.street,
      city: address_delivery.city,
      zip_code: address_delivery.zip_code,
      country: address_delivery.country,
    });

    // If new address, save it
    if (!addressDelivExist) {
      addressDelivExist = new Address({
        street: address_delivery.street,
        city: address_delivery.city,
        zip_code: address_delivery.zip_code,
        country: address_delivery.country,
      });
      await addressDelivExist.save();
      console.log("Delivery address", addressDelivExist);
    } else {
      console.log("Delivery address", addressDelivExist._id);
    }
    // addressDelivExist contain an saved address
    orderToSave.address_delivery = addressDelivExist;
    // Verify billing address
    let addressBillExist;
    if (address_billing !== address_delivery) {
      // Find billing address
      addressBillExist = await Address.findOne({
        street: address_billing.street,
        city: address_billing.city,
        zip_code: address_billing.zip_code,
        country: address_billing.country,
      });
      // If new address, save it
      if (!addressBillExist) {
        addressBillExist = new Address({
          street: address_billing.street,
          city: address_billing.city,
          zip_code: address_billing.zip_code,
          country: address_billing.country,
        });
        await addressBillExist.save();
        console.log("Billing address", addressBillExist);
      } else {
        console.log("Billing address", addressBillExist._id);
      }
    } else {
      addressBillExist = {...addressDelivExist};
      console.log("Billing address", addressBillExist);
    }
    // Addresses set
    orderToSave.address_billing = addressBillExist;
    // DISCOUNT
    if (discount) {
      const discountFound = await Discount.findById({discount});
      if (discountFound) orderToSave.discount = discountFound;
    }
    // STATUS
    let statusExist = await Status.findOne({title: "En attente"});
    if (!statusExist) {
      // If status doesn't exist, create it
      statusExist = new Status({
        title: "En attente",
        desc: "Votre commande est en attente de traitement.",
      });
      await statusExist.save();
    }
    orderToSave.status = statusExist;
    // ARTICLES
    let allArticles = [];
    let tmpArticle;
    for (let i = 0; i < articles.length; i++) {
      tmpArticle = null;
      tmpArticle = await Article.findById(articles[i].article);
      if (!tmpArticle)
        return res
          .status(404)
          .json({message: `Article ${articles[i].article} not found.`});
      allArticles.push({
        article: tmpArticle,
        amount: articles[i].amount,
        unit_price: tmpArticle.price,
      });
    }
    orderToSave.articles = allArticles;
    // CODE
    orderToSave.code = `CMD_${orderToSave.client._id
      .toString()
      .toUpperCase()
      .substring(10, 15)}_${new Date(Date.now()).getDate()}${new Date(
      Date.now()
    ).getMilliseconds()}`;

    // HISTORIES
    orderToSave = await addHistory(
      orderToSave,
      `Commande ${orderToSave.code} enregistrée`
    );

    // SAVING ORDER
    orderToSave.save();
    console.log("Order ", orderToSave);

    // Reduce articles stock after order saving
    for (let i = 0; i < orderToSave.articles.length; i++) {
      let stock = await Article.findById(orderToSave.articles[i].article);
      console.log(stock);

      await Article.findByIdAndUpdate(orderToSave.articles[i].article, {
        stock: stock.stock - orderToSave.articles[i].amount,
      });
    }
    await StripeOrder(orderToSave, res);
  } catch (error) {
    console.log(
      `${RED}Error in ${BLUE}Order.makeOrder()${RED} function : ${RESET}`,
      error
    );
    res.status(500).json({message: error});
  }
};

const StripeOrder = async (order, res) => {
  let stripe = Stripe(process.env.STRIPE_SECRET_KEY);

  let items = [];

  for (let i = 0; i < order.articles.length; i++) {
    items.push({
      price_data: {
        currency: "eur",
        product_data: {
          name: order.articles[i].article.title,
          description: order.articles[i].article.desc,
        },
        unit_amount: Math.round(order.articles[i].unit_price * 100),
      },
      quantity: order.articles[i].amount,
    });
  }

  console.log(items);

  const stripeSession = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [...items],
    mode: "payment",
    success_url: `${process.env.FRONT}/order-success/${order._id}`,
    cancel_url: `${process.env.FRONT}/order-failed/${order._id}`,
  });

  console.log(stripeSession);

  return res.status(200).json({session: stripeSession.id});
};

export const cancelOrder = async (req, res) => {
  try {
    const {id} = req.params;
    const order = await Order.findById(id);
    if (!order) return res.status(404).json({message: "Order not found."});
    // Reset stock
    for (let i = 0; i < order.articles.length; i++) {
      let stock = await Article.findById(order.articles[i].article);
      await Article.findByIdAndUpdate(order.articles[i].article, {
        stock: stock.stock + order.articles[i].amount,
      });
    }
    // Delete histories
    for (let i = 0; i < order.histories.length; i++) {
      await History.findByIdAndDelete(order.histories[i]);
    }
    await Order.findByIdAndDelete(id);
    res.status(200).json({ok: true});
  } catch (error) {
    console.log(
      `${RED}Error in ${BLUE}Order.cancelOrder()${RED} function : ${RESET}`,
      error
    );
    res.status(500).json({message: error});
  }
};

export const validateOrder = async (req, res) => {
  try {
    const {id} = req.params;
    let order = await Order.findById(id);
    if (!order) return res.status(404).json({message: "Order not found."});
    if (order.is_paid) return res.status(200).json({ok: true});
    // Add histories
    order.is_paid = true;
    order = await addHistory(order, `Commande payée et validée`);
    await order.save();

    return res.status(200).json({ok: true});
  } catch (error) {
    console.log(
      `${RED}Error in ${BLUE}Order.validateOrder()${RED} function : ${RESET}`,
      error
    );
    res.status(500).json({message: error});
  }
};

const addHistory = async (order, history_content) => {
  let tmpHistory = new History({
    content: history_content,
    code: order.code,
  });
  await tmpHistory.save();
  order.histories.push(tmpHistory);
  return order;
};
