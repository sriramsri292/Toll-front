import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext({
  
  origin: null,
  destination: null,
  selectingOrigin: true,
  originAddress: "",
  destinationAddress: "",
  originAddressError: null,
  destinationAddressError: null,
  form:null,
  responseData:null,
  data:null,
  setData:()=>{},
  setResponseData:()=>{},
  setForm:()=>{},
  setUserName: () => {},
  setChat: () => {},
  setOrigin: () => {},
  setDestination: () => {},
  setSelectingOrigin: () => {},
  setOriginAddress: () => {},
  setDestinationAddress: () => {},
  setOriginAddressError: () => {},
  setDestinationAddressError: () => {},
});

export const useCart = () => useContext(CartContext);

export default function CartContextProvider({ children }) {

   const [form,setForm]=useState([]);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [selectingOrigin, setSelectingOrigin] = useState(true);
const [originAddress, setOriginAddress] = useState("");
const [destinationAddress, setDestinationAddress] = useState("");
const [originAddressError, setOriginAddressError] = useState(null);
const [destinationAddressError, setDestinationAddressError] = useState(null);
const [responseData, setResponseData] = useState(null);
const [data, setData] = useState(null);

const value = {

origin,
form,
responseData,

destination,
selectingOrigin,
originAddress,
destinationAddress,
originAddressError,
destinationAddressError,
data,
setData,
setForm,
setOrigin,
setDestination,
setSelectingOrigin,
setOriginAddress,
setDestinationAddress,
setOriginAddressError,
setDestinationAddressError,
setResponseData
};





useEffect(() => {
console.log('Origin:', origin);
}, [origin]);

useEffect(() => {
    console.log('form:', origin);
    }, [form]);

useEffect(() => {
console.log('Destination:', destination);
}, [destination]);

useEffect(() => {
console.log('Selecting Origin:', selectingOrigin);
}, [selectingOrigin]);

useEffect(() => {
console.log('Origin Address:', originAddress);
}, [originAddress]);

useEffect(() => {
console.log('Destination Address:', destinationAddress);
}, [destinationAddress]);

useEffect(() => {
console.log('Origin Address Error:', originAddressError);
}, [originAddressError]);
useEffect(() => {
    console.log('responce of calc:', responseData);
    }, [responseData]);
    useEffect(() => {
        console.log('responce of calc poly:', data);
        }, [data]);
useEffect(() => {
console.log('Destination Address Error:', destinationAddressError);
}, [destinationAddressError]);

return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}