import {BLUE, RED, RESET} from "../lib/terminalColors.js";
import Order from "../models/order.model.js";
import User from "../models/user.model.js";

export const getAll = async (req, res) => {
  try {
    res.status(200).json(await getStats());
  } catch (error) {
    console.log(
      `${RED}Error in ${BLUE}ArticleType.getAll()${RED} function : ${RESET}`,
      error
    );
    res.status(500).json({message: error.message});
  }
};

const getStats = async () => {
  let returnData = {
    this_month: {
      revenue: null,
      nb_orders: null,
      nb_users: null,
    },
    last_month: {
      revenue: null,
      nb_orders: null,
      nb_users: null,
    },
  };
  let thisMonth = getMonthRange();
  const orders = await Order.find({
    createdAt: {$gte: thisMonth.begin, $lte: thisMonth.end},
  });
  const users = await User.find({
    createdAt: {$gte: thisMonth.begin, $lte: thisMonth.end},
  });
  returnData.this_month.nb_users = users.length;
  returnData.this_month.nb_orders = orders.length;
  returnData.this_month.revenue = orders.reduce(
    (acc, cur) =>
      Number(
        acc +
          cur.articles.reduce(
            (acc, art) => Number(acc + art.unit_price * art.amount),
            0
          )
      ),
    0
  );

  let lastMonth = getLastMonthRange();
  const lastOrders = await Order.find({
    createdAt: {$gte: lastMonth.begin, $lte: lastMonth.end},
  });
  const lastUsers = await User.find({
    createdAt: {$gte: lastMonth.begin, $lte: lastMonth.end},
  });
  returnData.last_month.nb_users = lastUsers.length;
  returnData.last_month.nb_orders = lastOrders.length;
  returnData.last_month.revenue = lastOrders.reduce(
    (acc, cur) =>
      Number(
        acc +
          cur.articles.reduce(
            (acc, art) => Number(acc + art.unit_price * art.amount),
            0
          )
      ),
    0
  );
  console.log(returnData);
  return returnData;
};

const getLastMonthRange = (today = new Date(Date.now())) => {
  let tmp = new Date(today);
  if (today.getMonth() > 0) tmp.setMonth(today.getMonth() - 1);
  else {
    tmp.setMonth(11);
    tmp.setFullYear(today.getFullYear() - 1);
  }
  return getMonthRange(tmp);
};

const getMonthRange = (today = new Date(Date.now())) => {
  let firstMonthDay = new Date(today);
  firstMonthDay.setDate(1);
  firstMonthDay.setHours(0);
  firstMonthDay.setMinutes(0);
  firstMonthDay.setSeconds(0);
  firstMonthDay.setMilliseconds(0);
  let lastMonthDay = new Date(today);
  switch (today.getMonth()) {
    case 0:
    case 2:
    case 4:
    case 6:
    case 7:
    case 9:
    case 11:
      lastMonthDay.setDate(31);
      break;
    case 3:
    case 5:
    case 8:
    case 10:
      lastMonthDay.setDate(30);
      break;
    case 1:
      if (today.getFullYear() % 4 === 0 && !today.getFullYear() % 100)
        lastMonthDay.setDate(28);
      else lastMonthDay.setDate(29);
      break;
  }
  lastMonthDay.setHours(23);
  lastMonthDay.setMinutes(59);
  lastMonthDay.setSeconds(59);
  lastMonthDay.setMilliseconds(999);
  return {begin: firstMonthDay, end: lastMonthDay};
};
