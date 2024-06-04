import axios from 'axios';
import {serverAddress} from './server_Address';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const GET_USER_TOKEN = async () => {
  const token = await AsyncStorage.getItem('token');
  return token;
};

export const GET_USER_ORG_ID = async () => {
  let data = JSON.parse(await AsyncStorage.getItem('details'));

  const idHere = data.user._id;

  return idHere;
};

export const GET_USER_DETAILS = async () => {
  let data = JSON.parse(await AsyncStorage.getItem('details'));
  const userDetails = data.user;

  // console.log('userDetails', userDetails);
  return userDetails;
};

export const GET_USER_DETAILS_ID = async () => {
  let userToken = await GET_USER_TOKEN();

  let orgID = await GET_USER_DETAILS();
  let id = orgID.org_admin_id._id;
  const url = `${serverAddress}/api/organisation/v2/get-org-details/${id}`;

  const response = await axios
    .get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    })
    .then(res => res?.data)
    .catch(error => error?.response?.data);

  return response;
};

export const ORG_LOGIN = async data => {
  const url = `${serverAddress}/api/organisation/v2/login-org-user`;

  const response = await axios
    .post(url, data)
    .then(res => res?.data)
    .catch(error => error?.response?.data);
  return response;
};

export const ORG_SIGNUP = async data => {
  const url = `${serverAddress}/api/organisation/v2/add-new-org`;

  const response = await axios
    .post(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(res => res?.data)
    .catch(error => error?.response?.data);

  return response;
};

export const GET_ALL_MEMBER = async () => {
  let userToken = await GET_USER_TOKEN();
  let orgID = await GET_USER_ORG_ID();
  let data = {org_id: orgID};
  const url = `${serverAddress}/api/organisation/v2/member/get-all-member`;

  const response = await axios
    .post(url, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    })
    .then(res => res?.data)
    .catch(error => error?.response?.data);

  return response;
};

export const GET_ALL_ORG = async () => {
  let userToken = await GET_USER_TOKEN();
  const url = `${serverAddress}/api/organisation/v2/get-all-org`;

  const response = await axios
    .get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    })
    .then(res => res?.data)
    .catch(error => error?.response?.data);
  return response;
};

export const ORG_STATISTICS_PARTNER = async () => {
  let userToken = await GET_USER_TOKEN();
  const url = `${serverAddress}/api/organisation/v2/org-statistics-partner`;

  const response = await axios
    .get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    })
    .then(res => res?.data)
    .catch(error => error?.response?.data);
  return response;
};

export const GET_ALL_INDUSTRY = async () => {
  const url = `${serverAddress}/api/industry/v2/get-all-industry`;

  const response = await axios
    .get(url)
    .then(res => res?.data)
    .catch(error => error?.response?.data);
  return response;
};

export const GET_COUPON_TYPE = async () => {
  let userToken = await GET_USER_TOKEN();
  const url = `${serverAddress}/api/organisation/v2/get-coupon-type`;

  const response = await axios
    .get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    })
    .then(res => res?.data)
    .catch(error => error?.response?.data);
  return response;
};

export const GET_ORG_PARTNERSHIP_REQUEST = async () => {
  let userToken = await GET_USER_TOKEN();
  const url = `${serverAddress}/api/organisation/v2/get-org-partnership-request`;

  const response = await axios
    .get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    })
    .then(res => res?.data)
    .catch(error => error?.response?.data);
    console.log(response,"Line 161")
  return response;
};

// http://13.232.45.208:4000/api/organisation/v2/upload-org-documents
// export const UPLOAD_DOCUMENT = async (adharCard, panCard, birthCer) => {

//     let userToken = await GET_USER_TOKEN();
//     const url = `${serverAddress}/api/organisation/v2/upload-org-documents`

//     console.log('url', url)
//     console.log('userToken', userToken)

//     console.log('adharCard,', adharCard)
//     console.log('panCard,', panCard)
//     console.log('birthCer', birthCer)

//     const response = await axios
//         .post(url,
//             {
//                 "files": adharCard,
//                 "files": panCard,
//                 "files": birthCer
//             },
//             {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': 'Bearer ' + userToken
//                 },
//             }
//         )
//         // .then((res) => res?.data)
//         // .catch((error) => error?.response?.data)

//         .then((res) => console.log('res?.data', res?.data))
//         .catch((error) => console.log('error?.response?.data', error?.response?.data))
//     return response
// }

export const SEND_PARTNERSHIP_REQUEST = async partner_id => {
  let userToken = await GET_USER_TOKEN();
  const url = `${serverAddress}/api/organisation/v2/send-partnership-request`;

  const response = await axios
    .post(
      url,
      {
        partner_id: partner_id,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + userToken,
        },
      },
    )
    .then(res => res?.data)
    .catch(error => error?.response?.data);
  return response;
};

export const SEND_PARTNERSHIP_REQUEST_FOR_AGENT = async data => {
  let userToken = await GET_USER_TOKEN();
  const url = `${serverAddress}/api/organisation/v2/send-partnership-request-for-agent`;

  const response = await axios
    .post(url, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    })
    .then(res => res?.data)
    .catch(error => error?.response?.data);
  return response;
};

export const MEMBER_CREATE = async (
  firstName,
  lastName,
  username,
  phoneNumber,
  designation,
) => {
  let userToken = await GET_USER_TOKEN();
  let orgID = await GET_USER_ORG_ID();
  const url = `${serverAddress}/api/organisation/v2/member/create`;
  // console.log('userToke', userToken)
  // console.log('id', orgID)

  let data = {
    org_id: orgID,
    org_user_first_name: firstName,
    org_user_last_name: lastName,
    org_user_phone: phoneNumber,
    username: username,
    designation: designation,
  };

  const response = await axios
    .post(url, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    })
    .then(res => res?.data)
    .catch(error => error?.response?.data);
  return response;
};

export const DELETE_MEMBER = async _id => {
  let userToken = await GET_USER_TOKEN();
  const url = `${serverAddress}/api/organisation/v2/member/delete-member`;

  var raw = JSON.stringify({
    _id: _id,
  });
  let myHeaders = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + userToken,
  };

  var requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  const response = fetch(url, requestOptions)
    .then(response => response.text())
    .then(result => result)
    .catch(error => error);

  return response;
};

export const UPDATE_MEMBER = async (
  id,
  firstName,
  lastName,
  email,
  phoneNumber,
  designation,
) => {
  let userToken = await GET_USER_TOKEN();
  const url = `${serverAddress}/api/organisation/v2/member/update-member`;

  let data = {
    _id: id,
    org_user_first_name: firstName,
    org_user_last_name: lastName,
    org_user_phone: phoneNumber,
    username: email,
    designation: designation,
  };

  // console.log('url', url)
  // console.log('data', data)
  // console.log('headers', headers)

  const response = await axios
    .patch(url, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    })
    .then(res => res?.data)
    .catch(error => error?.response?.data);
  return response;
};

export const DECLINE_PARTNERSHIP_REQUEST = async (
  id,
  req_id,
  cancelResion,
  validity,
) => {
  let userToken = await GET_USER_TOKEN();
  const url = `${serverAddress}/api/organisation/v2/decline-partnership-request`;

  let data = {
    partner_id: id,
    requested_id: req_id,
    declined_reason: cancelResion,
    validity: validity,
  };

  const response = await axios
    .post(url, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    })
    .then(res => res?.data)
    .catch(error => error?.response?.data);
  return response;
};

export const DECLINE_AGENT_PARTNERSHIP_REQUEST = async (id, req_id) => {
  let userToken = await GET_USER_TOKEN();
  const url = `${serverAddress}/api/organisation/v2/decline-agent-partnership-request`;

  let data = {
    agent_id: id,
    requested_id: req_id,
  };

  const response = await axios
    .post(url, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    })
    .then(res => res?.data)
    .catch(error => error?.response?.data);
  return response;
};

export const RESEND_PARTNERSHIP_REQUEST = async (id, req_id) => {
  let userToken = await GET_USER_TOKEN();
  const url = `${serverAddress}/api/organisation/v2/resend-partnership-request`;

  let data = {
    partner_id: id,
    requested_id: req_id,
  };

  const response = await axios
    .post(url, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    })
    .then(res => res?.data)
    .catch(error => error?.response?.data);
  return response;
};

export const RESEND_AGENT_PARTNERSHIP_REQUEST = async (id, req_id) => {
  let userToken = await GET_USER_TOKEN();
  const url = `${serverAddress}/api/organisation/v2/resend-agent-partnership-request`;

  let data = {
    agent_id: id,
    requested_id: req_id,
  };

  const response = await axios
    .post(url, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    })
    .then(res => res?.data)
    .catch(error => error?.response?.data);
  return response;
};

export const ACCEPT_PARTNERSHIP_REQUEST = async (id, req_id) => {
  let userToken = await GET_USER_TOKEN();
  const url = `${serverAddress}/api/organisation/v2/accept-partnership-request`;

  let data = {
    work_as_agent_flag: false,
    partner_id: id,
    requested_id: req_id,
  };

  const response = await axios
    .post(url, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    })
    .then(res => res?.data)
    .catch(error => error?.response?.data);
  return response;
};

export const ACCEPT_AGENT_PARTNERSHIP_REQUEST = async (id, req_id) => {
  let userToken = await GET_USER_TOKEN();
  const url = `${serverAddress}/api/organisation/v2/accept-agent-partnership-request`;

  let data = {
    agent_id: id,
    requested_id: req_id,
  };

  const response = await axios
    .post(url, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    })
    .then(res => res?.data)
    .catch(error => error?.response?.data);
  return response;
};

export const CREATE_PASSWORD = async pwd => {
  let userToken = await GET_USER_TOKEN();
  const url = `${serverAddress}/api/organisation/v2/update-password`;

  let details = await GET_USER_DETAILS();
  let username = details.username;

  let data = {
    username: username,
    password: pwd,
  };
  // console.log('data', data)

  const response = await axios
    .patch(url, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    })
    .then(res => res?.data)
    .catch(error => error?.response?.data);
  return response;
};

export const GET_ALL_CUSTOMER = async () => {
  const url = `${serverAddress}/api/customer/v2/get-all-customer`;

  console.log('url', url);

  let userToken = await GET_USER_TOKEN();
  console.log(userToken, 'Line 531');
  let fet = await GET_USER_DETAILS();
  let org_id = fet.org_admin_id._id;

  console.log('org_id: ' + org_id);

  const data = {
    org_id: org_id,
  };

  const response = await axios
    .post(url, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    })
    .then(res => res?.data)
    .catch(error => error?.response?.data);
  console.log(response, 'Line 518');
  return response;
};

export const CREATE_CUSTOMER = async (fullName, email, phoneNumber) => {
  let userToken = await GET_USER_TOKEN();
  const url = `${serverAddress}/api/customer/v2/create-customer`;

  let fet = await GET_USER_DETAILS();
  let org_id = fet.org_admin_id._id;

  let data = {
    org_id: org_id,
    full_name: fullName,
    phone: phoneNumber,
    email: email,
  };
  console.log(data, 'Line 535');
  const response = await axios
    .post(url, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    })
    .then(res => res?.data)
    .catch(error => error?.response?.data);
  return response;
};

export const GET_TEMPLATE = async title => {
  // http://localhost:3000/api/admin/v2/get-template/coupon/Discount Coupons

  const url = `${serverAddress}/api/admin/v2/get-template/coupon/${title}`;

  const response = await axios
    .get(url)
    .then(res => res?.data)
    .catch(error => error?.response?.data);
  return response;
};

export const ADD_COUPON = async data => {
  let userToken = await GET_USER_TOKEN();
  const url = `${serverAddress}/api/organisation/v2/add-coupon`;

  const response = await axios
    .post(url, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(res => res?.data)
    .catch(error => error?.response?.data);
  return response;
};

export const ADD_PARTNERSHIP_REQUIRED = async data => {
  let userToken = await GET_USER_TOKEN();
  const url = `${serverAddress}/api/organisation/v2/add-partnership-required`;

  const response = await axios
    .patch(url, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(res => res?.data)
    .catch(error => error?.response?.data);
  return response;
};

export const GET_FILTER_PARTNER_UP = async data => {
  let userToken = await GET_USER_TOKEN();
  const url = `${serverAddress}/api/organisation/v2/get-filter-partner-up`;

  const response = await axios
    .post(url, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    })
    .then(res => res?.data)
    .catch(error => error?.response?.data);
  return response;
};

export const GET_ALL_TEMPLATE = async () => {
  const url = `${serverAddress}/api/admin/v2/get-all-template`;

  const response = await axios
    .get(url)
    .then(res => res?.data)
    .catch(error => error?.response?.data);
  return response;
};

export const UPDATE_ORG = async (industry_id, name, area, about) => {
  let userToken = await GET_USER_TOKEN();
  let userDetailID = await GET_USER_DETAILS();
  let orgID = userDetailID.org_admin_id._id;

  const url = `${serverAddress}/api/organisation/v2/update-org`;

  let data = {
    org_id: orgID,
    name: name,
    industry_id: industry_id,
    area: area,
    about: about,
  };
console.log(data,"Line 635")
  const response = await axios
    .patch(url, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    })
    .then(res => res?.data)
    .catch(error => error?.response?.data);
  return response;
};

export const UPLOAD_ORG_PROFILE = async data => {
  let userToken = await GET_USER_TOKEN();
  const url = `${serverAddress}/api/organisation/v2/upload-org-profile`;

  const response = await axios
    .post(url, data, {
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + userToken,
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(res => res?.data)
    .catch(error => error?.response?.data);
  return response;
};

export const GET_AGENT_PARTNER_UP = async () => {
  let userToken = await GET_USER_TOKEN();
  const url = `${serverAddress}/api/organisation/v2/get-agent-partner-up`;

  const response = await axios
    .get(url, {
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    })
    .then(res => res?.data)
    .catch(error => error?.response?.data);
  return response;
};

export const GET_ORG_COUPON_DATA = async data => {
  let userToken = await GET_USER_TOKEN();
  const url = `${serverAddress}/api/organisation/v2/get-coupon-data`;

  const response = await axios
    .post(url, data, {
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + userToken,
        'Content-Type': 'application/json',
      },
    })
    .then(res => res?.data)
    .catch(error => error?.response?.data);
  return response;
};

export const LOG_OUT_ADMIN = async data => {
  console.log(data);
  let userToken = await GET_USER_TOKEN();
  const url = `${serverAddress}/api/organisation/v2/logout-org-user`;
  const response = await axios
    .post(url, data, {
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + userToken,
        'Content-Type': 'application/json',
      },
    })
    .then(res => res?.data)
    .catch(error => error?.response?.data);
  return response;
};
