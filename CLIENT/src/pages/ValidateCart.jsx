import {useContext, useState} from "react";
import TitleTwo from "../components/TitleTwo";
import TitleThree from "../components/TitleThree";
import Input from "../components/Input";
import Button from "../components/Button";
import {CartContext} from "../context/CartContext";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {UserContext} from "../context/UserContext";
import {loadStripe} from "@stripe/stripe-js";
import {makeOrder} from "../apis/order.api";
import {toast} from "react-hot-toast";

export default function ValidateCart() {
  const [fact, setFact] = useState(false);
  const {cart, getTotalPrice} = useContext(CartContext);
  const {user} = useContext(UserContext);
  const [billErrors, setBillErrors] = useState({
    bill_fullname: "",
    bill_address: "",
    bill_city: "",
    // bill_email: "",
    bill_country: "",
    bill_zip_code: "",
  });

  const schema = yup.object({
    delivery_fullname: yup.string().required("Veuillez indiquer votre nom."),
    // delivery_email: yup
    //   .string()
    //   .required("Veuillez indiquer une adresse email.")
    //   .email("Veuillez indiquer une adresse email valide."),
    delivery_address: yup.string().required("Veuillez indiquer une adresse."),
    delivery_city: yup.string().required("Veuillez indiquer une ville."),
    delivery_zip_code: yup
      .string()
      .required("Veuillez indiquer un code postal."),
    delivery_country: yup.string().required("Veuillez indiquer un pays."),
    bill_fullname: yup.string(),
    // bill_email: yup
    //   .string()
    //   .email("Veuillez indiquer une adresse email valide."),
    bill_address: yup.string(),
    bill_city: yup.string(),
    bill_zip_code: yup.string(),
    bill_country: yup.string(),
  });
  const defaultValues = {
    delivery_fullname: user.fullname || "",
    // delivery_email: user.email || "",
    delivery_address: "",
    delivery_city: "",
    delivery_zip_code: "",
    delivery_country: "",
    bill_fullname: "",
    // bill_email: "",
    bill_address: "",
    bill_city: "",
    bill_zip_code: "",
    bill_country: "",
  };
  const {
    register,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });

  const submit = async (values) => {
    setBillErrors({
      bill_fullname: "",
      bill_address: "",
      bill_city: "",
      // bill_email: "",
      bill_country: "",
      bill_zip_code: "",
    });
    if (!document.getElementById("seeFact_checkbox").checked) {
      values.bill_address = values.delivery_address;
      values.bill_city = values.delivery_city;
      values.bill_fullname = values.delivery_fullname;
      // values.bill_email = values.delivery_email;
      values.bill_zip_code = values.delivery_zip_code;
      values.bill_country = values.delivery_country;
    } else {
      // VERIFICATION
      let error = false;
      if (!values.bill_fullname) {
        error = true;
        setBillErrors((current) => ({
          ...current,
          bill_fullname: {message: "Veuillez indiquer un nom de facturation."},
        }));
      }
      if (!values.bill_address) {
        error = true;
        setBillErrors((current) => ({
          ...current,
          bill_address: {
            message: "Veuillez indiquer une adresse de facturation.",
          },
        }));
      }
      if (!values.bill_city) {
        error = true;
        setBillErrors((current) => ({
          ...current,
          bill_city: {
            message: "Veuillez indiquer une ville de facturation.",
          },
        }));
      }
      if (!values.bill_country) {
        error = true;
        setBillErrors((current) => ({
          ...current,
          bill_country: {
            message: "Veuillez indiquer un pays de facturation.",
          },
        }));
      }
      // if (!values.bill_email) {
      //   error = true;
      //   setBillErrors((current) => ({
      //     ...current,
      //     bill_email: {
      //       message: "Veuillez indiquer un email de facturation.",
      //     },
      //   }));
      // }
      if (!values.bill_zip_code) {
        error = true;
        setBillErrors((current) => ({
          ...current,
          bill_zip_code: {
            message: "Veuillez indiquer un code postal de facturation.",
          },
        }));
      }
      if (error) return;
    }

    let compressedCart = [];

    for (let i = 0; i < cart.length; i++) {
      compressedCart.push({
        article: cart[i].article._id,
        amount: cart[i].nb,
      });
    }

    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
    const response = await makeOrder({
      client: user._id,
      address_delivery: {
        street: values.delivery_address,
        city: values.delivery_city,
        zip_code: values.delivery_zip_code,
        country: values.delivery_country,
      },
      address_billing: {
        street: values.bill_address,
        city: values.bill_city,
        zip_code: values.bill_zip_code,
        country: values.bill_country,
      },
      articles: compressedCart,
      discount: null,
    });
    if (response?.session) {
      await stripe.redirectToCheckout({
        sessionId: response.session,
      });
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div className="flex w-full min-h-screen pt-[77px] px-[20%]">
      <div className="flex w-full py-10 flex-col gap-2.5">
        <TitleTwo>Validation du panier</TitleTwo>
        <div className="flex flex-col-reverse md:flex-row w-full gap-4 pt-2.5">
          {/* Formulaire */}
          <form
            className="flex w-full flex-col gap-2.5"
            onSubmit={handleSubmit(submit)}
          >
            <section className="flex w-full flex-col gap-2.5">
              <TitleThree>
                Informations de{" "}
                <span className="text-primary font-semibold">livraison</span>
              </TitleThree>
              <Input
                label={"Nom"}
                placeholder="John Doe"
                type="text"
                yup={register("delivery_fullname")}
                yupError={errors.delivery_fullname}
              />
              {/* <Input
                label={"Email"}
                placeholder="john.doe@example.com"
                type="email"
                yup={register("delivery_email")}
                yupError={errors.delivery_email}
              /> */}
              <Input
                label={"Adresse"}
                placeholder="22 rue du Sourire"
                type="text"
                yup={register("delivery_address")}
                yupError={errors.delivery_address}
              />
              <div className="flex w-full gap-2.5">
                <Input
                  label={"Ville"}
                  placeholder="Smile City"
                  type="text"
                  yup={register("delivery_city")}
                  yupError={errors.delivery_city}
                />
                <Input
                  label={"Code postal"}
                  placeholder="1337"
                  type="text"
                  yup={register("delivery_zip_code")}
                  yupError={errors.delivery_zip_code}
                />
              </div>{" "}
              <Input
                label={"Pays"}
                placeholder="France"
                type="text"
                yup={register("delivery_country")}
                yupError={errors.delivery_country}
              />
            </section>
            <div className="flex w-full gap-2.5">
              <input
                value={fact}
                onChange={(e) => {
                  setFact(e.target.checked);
                }}
                type="checkbox"
                id="seeFact_checkbox"
                className="!rounded-[5px] mt-1 relative peer appearance-none min-w-4 max-w-4 max-h-4 min-h-4 border border-primary cursor-pointer text-bg checked:bg-secondary checked:!bg-primary before:checked:content-[2714] before:checked:absolute before:checked:right-[1px] before:checked:top-[-5px] before:checked:text-primary check"
              />
              <label htmlFor="seeFact_checkbox" className="pt-1">
                Mes informations de facturation sont différentes des
                informations de livraison.
              </label>
            </div>
            {fact && (
              <section className="flex w-full flex-col gap-2.5">
                <TitleThree>
                  Informations de{" "}
                  <span className="text-primary font-semibold">
                    facturation
                  </span>
                </TitleThree>
                <Input
                  label={"Nom"}
                  placeholder="John Doe"
                  type="text"
                  yup={register("bill_fullname")}
                  yupError={billErrors.bill_fullname}
                />
                {/* <Input
                  label={"Email"}
                  placeholder="john.doe@example.com"
                  type="email"
                  yup={register("bill_email")}
                  yupError={billErrors.bill_email}
                /> */}
                <Input
                  label={"Adresse"}
                  placeholder="22 rue du Sourire"
                  type="text"
                  yup={register("bill_address")}
                  yupError={billErrors.bill_address}
                />
                <div className="flex w-full gap-2.5">
                  <Input
                    label={"Ville"}
                    placeholder="Smile City"
                    type="text"
                    yup={register("bill_city")}
                    yupError={billErrors.bill_city}
                  />
                  <Input
                    label={"Code postal"}
                    placeholder="1337"
                    type="text"
                    yup={register("bill_zip_code")}
                    yupError={billErrors.bill_zip_code}
                  />
                </div>{" "}
                <Input
                  label={"Pays"}
                  placeholder="France"
                  type="text"
                  yup={register("bill_country")}
                  yupError={billErrors.bill_country}
                />
              </section>
            )}
            <Button colored isFull text="Procéder au paiement" />
          </form>

          {/* Cart */}
          <section className="flex w-full flex-col h-full relative">
            <div className="flex w-full flex-col sticky top-20 gap-2.5">
              <TitleThree>Résumé du Panier</TitleThree>
              <div className="bg-white w-full flex flex-col p-5 gap-2.5">
                {cart.map((item, idx) => (
                  <div
                    className="flex justify-between items-center"
                    key={`cart_item_${idx}`}
                  >
                    <div className="flex gap-2.5 items-center">
                      <p>
                        {item.article.title} x {item.nb}{" "}
                      </p>
                    </div>
                    <p className="font-medium">
                      {item.article.price * item.nb} €
                    </p>
                  </div>
                ))}
                <hr className="border-b-1 w-full border-b-black/5 opacity-20" />
                <div className="flex justify-between">
                  <p className="font-semibold text-xl">Total</p>
                  <p className="font-semibold text-xl">{getTotalPrice()} €</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
