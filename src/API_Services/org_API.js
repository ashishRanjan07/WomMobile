import {
    ORG_LOGIN,
    ORG_SIGNUP,
    GET_ALL_ORG,
    UPLOAD_DOCUMENT,
    SEND_PARTNERSHIP_REQUEST,
    GET_ALL_INDUSTRY,
    GET_ORG_PARTNERSHIP_REQUEST,
    GET_ALL_MEMBER,
    MEMBER_CREATE,
    DELETE_MEMBER,
    UPDATE_MEMBER,
    ORG_STATISTICS_PARTNER,
    DECLINE_PARTNERSHIP_REQUEST,
    ACCEPT_PARTNERSHIP_REQUEST,
    CREATE_PASSWORD,
    GET_ALL_CUSTOMER,
    CREATE_CUSTOMER,
    GET_TEMPLATE,
    ADD_COUPON,
    GET_USER_DETAILS_ID,
    ADD_PARTNERSHIP_REQUIRED,
    RESEND_PARTNERSHIP_REQUEST,
    GET_FILTER_PARTNER_UP,
    GET_COUPON_TYPE,
    GET_ALL_TEMPLATE,
    UPDATE_ORG,
    UPLOAD_ORG_PROFILE,
    GET_AGENT_PARTNER_UP,
    SEND_PARTNERSHIP_REQUEST_FOR_AGENT,
    DECLINE_AGENT_PARTNERSHIP_REQUEST,
    ACCEPT_AGENT_PARTNERSHIP_REQUEST,
    RESEND_AGENT_PARTNERSHIP_REQUEST,
    GET_ORG_COUPON_DATA,
    LOG_OUT_ADMIN,
} from './API_service'

export const orgLogin = async (data) => {
    try {
        const response = await ORG_LOGIN(data)
        if (!response) {
            return `Can't connect to server`
        } else if (response?.error === true) {
            return response
        } else {
            return response
        }
    } catch (error) {
        return error.message
    }
}

export const orgSignUp = async (data) => {
    try {
        const response = await ORG_SIGNUP(data)
        if (!response) {
            return `Can't connect to server`
        } else if (response?.error === true) {
            return response
        } else {
            return response
        }
    } catch (error) {
        return error.message
    }
}

export const getallorg = async () => {
    try {
        const response = await GET_ALL_ORG()
        if (!response) {
            return `Can't connect to server`
        } else if (response?.error === true) {
            return response
        } else {
            return response
        }
    } catch (error) {
        return error.message
    }
}

export const getfilterpartnerup = async (data) => {
    try {
        const response = await GET_FILTER_PARTNER_UP(data)
        if (!response) {
            return `Can't connect to server`
        } else if (response?.error === true) {
            return response
        } else {
            return response
        }
    } catch (error) {
        return error.message
    }
}

export const getuserdetailsID = async () => {
    try {
        const response = await GET_USER_DETAILS_ID()
        if (!response) {
            return `Can't connect to server`
        } else if (response?.error === true) {
            return response
        } else {
            return response
        }
    } catch (error) {
        return error.message
    }
}

export const orgstatisticspartner = async () => {
    try {
        const response = await ORG_STATISTICS_PARTNER()
        if (!response) {
            return `Can't connect to server`
        } else if (response?.error === true) {
            return response
        } else {
            return response
        }
    } catch (error) {
        return error.message
    }
}

export const getorgpartnershipRequest = async () => {
    try {
        const response = await GET_ORG_PARTNERSHIP_REQUEST()
        if (!response) {
            return `Can't connect to server`
        } else if (response?.error === true) {
            return response
        } else {
            return response
        }
    } catch (error) {
        return error.message
    }
}

export const getAllIndustry = async () => {
    try {
        const response = await GET_ALL_INDUSTRY()
        if (!response) {
            return `Can't connect to server`
        } else if (response?.error === true) {
            return response
        } else {
            return response
        }
    } catch (error) {
        return error.message
    }
}

export const getCoupontype = async () => {
    try {
        const response = await GET_COUPON_TYPE()
        if (!response) {
            return `Can't connect to server`
        } else if (response?.error === true) {
            return response
        } else {
            return response
        }
    } catch (error) {
        return error.message
    }
}

export const getTemplate = async (title) => {
    try {
        const response = await GET_TEMPLATE(title)
        if (!response) {
            return `Can't connect to server`
        } else if (response?.error === true) {
            return response
        } else {
            return response
        }
    } catch (error) {
        return error.message
    }
}

export const addCoupon = async (data) => {
    try {
        const response = await ADD_COUPON(data)
        if (!response) {
            return `Can't connect to server`
        } else if (response?.error === true) {
            return response
        } else {
            return response
        }
    } catch (error) {
        return error.message
    }
}

export const addpartnershiprequired = async (data) => {
    try {
        const response = await ADD_PARTNERSHIP_REQUIRED(data)
        if (!response) {
            return `Can't connect to server`
        } else if (response?.error === true) {
            return response
        } else {
            return response
        }
    } catch (error) {
        return error.message
    }
}

export const deletemember = async (_id) => {
    try {
        const response = await DELETE_MEMBER(_id)
        if (!response) {
            return `Can't connect to server`
        } else if (response?.error === true) {
            return response
        } else {
            return response
        }
    } catch (error) {
        return error.message
    }
}

export const getallmember = async () => {
    try {
        const response = await GET_ALL_MEMBER()
        if (!response) {
            return `Can't connect to server`
        } else if (response?.error === true) {
            return response
        } else {
            return response
        }
    } catch (error) {
        return error.message
    }
}

export const membercreate = async (firstName, lastName, username, phoneNumber, designation) => {
    try {
        const response = await MEMBER_CREATE(firstName, lastName, username, phoneNumber, designation)
        if (!response) {
            return `Can't connect to server`
        } else if (response?.error === true) {
            return response
        } else {
            return response
        }
    } catch (error) {
        return error.message
    }
}

// export const uploadDocument = async (adharCard, panCard, birthCer) => {
//     try {
//         const response = await UPLOAD_DOCUMENT(adharCard, panCard, birthCer)
//         if (!response) {
//             return `Can't connect to server`
//         } else if (response?.error === true) {
//             return response
//         } else {
//             return response
//         }
//     } catch (error) {
//         return error.message
//     }
// }

export const sendpartnershiprequest = async (partner_id) => {
    try {
        const response = await SEND_PARTNERSHIP_REQUEST(partner_id)
        if (!response) {
            return `Can't connect to server`
        } else if (response?.error === true) {
            return response
        } else {
            return response
        }
    } catch (error) {
        return error.message
    }
}

export const sendpartnershiprequestforagent = async (data) => {
    try {
        const response = await SEND_PARTNERSHIP_REQUEST_FOR_AGENT(data)
        if (!response) {
            return `Can't connect to server`
        } else if (response?.error === true) {
            return response
        } else {
            return response
        }
    } catch (error) {
        return error.message
    }
}

export const updateMember = async (id, firstName, lastName, email, phoneNumber, designation) => {
    try {
        const response = await UPDATE_MEMBER(id, firstName, lastName, email, phoneNumber, designation)
        if (!response) {
            return `Can't connect to server`
        } else if (response?.error === true) {
            return response
        } else {
            return response
        }
    } catch (error) {
        return error.message
    }
}

export const declinepartnershiprequest = async (id, req_id, cancelResion, validity) => {
    try {
        const response = await DECLINE_PARTNERSHIP_REQUEST(id, req_id, cancelResion, validity)
        if (!response) {
            return `Can't connect to server`
        } else if (response?.error === true) {
            return response
        } else {
            return response
        }
    } catch (error) {
        return error.message
    }
}

export const declineagentpartnershiprequest = async (id, req_id) => {
    try {
        const response = await DECLINE_AGENT_PARTNERSHIP_REQUEST(id, req_id)
        if (!response) {
            return `Can't connect to server`
        } else if (response?.error === true) {
            return response
        } else {
            return response
        }
    } catch (error) {
        return error.message
    }
}

export const resendpartnershiprequest = async (id, req_id) => {
    try {
        const response = await RESEND_PARTNERSHIP_REQUEST(id, req_id)
        if (!response) {
            return `Can't connect to server`
        } else if (response?.error === true) {
            return response
        } else {
            return response
        }
    } catch (error) {
        return error.message
    }
}

export const resend_agent_partnership_request = async (id, req_id) => {
    try {
        const response = await RESEND_AGENT_PARTNERSHIP_REQUEST(id, req_id)
        if (!response) {
            return `Can't connect to server`
        } else if (response?.error === true) {
            return response
        } else {
            return response
        }
    } catch (error) {
        return error.message
    }
}

export const acceptpartnershiprequest = async (id, req_id) => {
    try {
        const response = await ACCEPT_PARTNERSHIP_REQUEST(id, req_id)
        if (!response) {
            return `Can't connect to server`
        } else if (response?.error === true) {
            return response
        } else {
            return response
        }
    } catch (error) {
        return error.message
    }
}

export const accept_agent_partnership_request = async (id, req_id) => {
    try {
        const response = await ACCEPT_AGENT_PARTNERSHIP_REQUEST(id, req_id)
        if (!response) {
            return `Can't connect to server`
        } else if (response?.error === true) {
            return response
        } else {
            return response
        }
    } catch (error) {
        return error.message
    }
}

export const createPassword = async (pwd) => {
    try {
        const response = await CREATE_PASSWORD(pwd)
        if (!response) {
            return `Can't connect to server`
        } else if (response?.error === true) {
            return response
        } else {
            return response
        }
    } catch (error) {
        return error.message
    }
}

export const getallcustomer = async () => {
    try {
        const response = await GET_ALL_CUSTOMER()
        if (!response) {
            return `Can't connect to server`
        } else if (response?.error === true) {
            return response
        } else {
            return response
        }
    } catch (error) {
        return error.message
    }
}

export const createcustomer = async (fullName, email, phoneNumber) => {
    try {
        const response = await CREATE_CUSTOMER(fullName, email, phoneNumber)
        if (!response) {
            return `Can't connect to server`
        } else if (response?.error === true) {
            return response
        } else {
            return response
        }
    } catch (error) {
        return error.message
    }
}

export const getalltemplate = async () => {
    try {
        const response = await GET_ALL_TEMPLATE()
        if (!response) {
            return `Can't connect to server`
        } else if (response?.error === true) {
            return response
        } else {
            return response
        }
    } catch (error) {
        return error.message
    }
}

export const update_org = async (industry_id, name, area, about) => {
    try {
        const response = await UPDATE_ORG(industry_id, name, area, about)
        if (!response) {
            return `Can't connect to server`
        } else if (response?.error === true) {
            return response
        } else {
            return response
        }
    } catch (error) {
        return error.message
    }
}

export const uploadorgprofile = async (data) => {
    try {
        const response = await UPLOAD_ORG_PROFILE(data)
        if (!response) {
            return `Can't connect to server`
        } else if (response?.error === true) {
            return response
        } else {
            return response
        }
    } catch (error) {
        return error.message
    }
}

export const get_agent_partner_up = async () => {
    try {
        const response = await GET_AGENT_PARTNER_UP()
        if (!response) {
            return `Can't connect to server`
        } else if (response?.error === true) {
            return response
        } else {
            return response
        }
    } catch (error) {
        return error.message
    }
}


export const get_org_coupon_data=async(data)=>{
    try{  
const response=await GET_ORG_COUPON_DATA(data)
if (!response) {
    return `Can't connect to server`
} else if (response?.error === true) {
    return response
} else {
    return response
}
    }catch(err){
        return err.message
    }
}


export const log_out_admin=async(data)=>{
    try{  
     
        const response=await LOG_OUT_ADMIN(data)
        // console.log(response);
        if (!response) {
            return `Can't connect to server`
        } else if (response?.error === true) {
            return response
        } else {
            return response
        }
            }catch(err){
                return err.message
        }
}