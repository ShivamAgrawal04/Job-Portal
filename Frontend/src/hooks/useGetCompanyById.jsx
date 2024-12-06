import { COMPANY_API_END_POINT } from "@/components/utils/constant";
import { setSingleCompany } from "@/redux/companySlice";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetCompanyById = (companyId) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchSingleCompany = async () => {
      try {
        const res = await axios.get(
          `${COMPANY_API_END_POINT}/get/${companyId}`,
          {
            withCredentials: true,
          }
        );
        console.log("Hello", res.data.company);
        if (res.data.success) {
          dispatch(setSingleCompany(res.data.company));
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchSingleCompany();
  }, [companyId, dispatch]);
};

export default useGetCompanyById;
