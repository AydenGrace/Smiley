import React, {useEffect, useState} from "react";

import {useNavigate} from "react-router-dom";

import {useParams} from "react-router-dom";
import {getOrderDetails} from "../apis/order.api";

export default function AdminSaleDetails() {
  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(() => {
    const getDatas = async () => {
      const response = await getOrderDetails(id);
      console.log(response);

      if (!id) return;
    };
    getDatas();
  }, [id]);

  return <div className="w-full min-h-screen"></div>;
}
