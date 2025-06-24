// SSLCommerz configuration and utility functions

export const SSLCOMMERZ_CONFIG = {
  store_id: process.env.NEXT_PUBLIC_SSLCOMMERZ_STORE_ID || 'testbox',
  store_passwd: process.env.SSLCOMMERZ_STORE_PASSWORD || 'qwerty',
  is_sandbox: process.env.NODE_ENV === 'development' || process.env.NEXT_PUBLIC_SSLCOMMERZ_SANDBOX === 'true',
  base_url: process.env.NODE_ENV === 'development' 
    ? 'https://sandbox.sslcommerz.com' 
    : 'https://securepay.sslcommerz.com'
};

export interface SSLCommerzPaymentData {
  orderId: string;
  amount: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  customerCity: string;
  customerPostCode: string;
  customerCountry: string;
  items: Array<{
    name: string;
    price: number;
    quantity: number;
  }>;
}

export interface SSLCommerzResponse {
  success: boolean;
  gatewayPageURL?: string;
  tran_id?: string;
  sessionkey?: string;
  error?: string;
  details?: any;
}

export const formatSSLCommerzPaymentData = (data: SSLCommerzPaymentData) => {
  return {
    store_id: SSLCOMMERZ_CONFIG.store_id,
    store_passwd: SSLCOMMERZ_CONFIG.store_passwd,
    total_amount: data.amount,
    currency: 'BDT',
    tran_id: `${data.orderId}_${Date.now()}`,
    product_category: 'education',
    cus_name: data.customerName,
    cus_email: data.customerEmail,
    cus_add1: data.customerAddress,
    cus_add2: '',
    cus_city: data.customerCity,
    cus_state: '',
    cus_postcode: data.customerPostCode,
    cus_country: data.customerCountry,
    cus_phone: data.customerPhone,
    cus_fax: '',
    ship_name: data.customerName,
    ship_add1: data.customerAddress,
    ship_add2: '',
    ship_city: data.customerCity,
    ship_state: '',
    ship_postcode: data.customerPostCode,
    ship_country: data.customerCountry,
    multi_card_name: '',
    num_of_item: data.items.length,
    product_name: data.items.map(item => item.name).join(', '),
    product_category: 'education',
    product_profile: 'educational',
    value_a: data.orderId,
    value_b: '',
    value_c: '',
    value_d: '',
    show_product: '1',
    shipping_method: 'NO',
    product_name_1: data.items[0]?.name || 'Course',
    product_category_1: 'education',
    product_profile_1: 'educational',
    product_amount_1: data.items[0]?.price || data.amount,
    product_quantity_1: data.items[0]?.quantity || 1,
    product_name_2: data.items[1]?.name || '',
    product_category_2: 'education',
    product_profile_2: 'educational',
    product_amount_2: data.items[1]?.price || 0,
    product_quantity_2: data.items[1]?.quantity || 0,
    product_name_3: data.items[2]?.name || '',
    product_category_3: 'education',
    product_profile_3: 'educational',
    product_amount_3: data.items[2]?.price || 0,
    product_quantity_3: data.items[2]?.quantity || 0,
    product_name_4: data.items[3]?.name || '',
    product_category_4: 'education',
    product_profile_4: 'educational',
    product_amount_4: data.items[3]?.price || 0,
    product_quantity_4: data.items[3]?.quantity || 0,
    product_name_5: data.items[4]?.name || '',
    product_category_5: 'education',
    product_profile_5: 'educational',
    product_amount_5: data.items[4]?.price || 0,
    product_quantity_5: data.items[4]?.quantity || 0,
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/payment/success`,
    fail_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/payment/fail`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/payment/cancel`,
    ipn_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/payment/sslcommerz/ipn`,
  };
};

export const validateSSLCommerzResponse = (response: any): SSLCommerzResponse => {
  if (response.status === 'VALID' || response.status === 'VALIDATED') {
    return {
      success: true,
      gatewayPageURL: response.GatewayPageURL,
      tran_id: response.tran_id,
      sessionkey: response.sessionkey,
    };
  } else {
    return {
      success: false,
      error: 'Payment gateway error',
      details: response,
    };
  }
};

export const getPaymentMethodName = (paymentMethod: string): string => {
  const methods: { [key: string]: string } = {
    'card': 'Credit/Debit Card',
    'mobile_banking': 'Mobile Banking',
    'internet_banking': 'Internet Banking',
    'atm': 'ATM Card',
    'bkash': 'bKash',
    'nagad': 'Nagad',
    'rocket': 'Rocket',
    'upay': 'Upay',
  };
  
  return methods[paymentMethod] || paymentMethod;
};

// Test card information for sandbox
export const SSLCOMMERZ_TEST_CARDS = {
  visa: {
    number: '4111111111111111',
    description: 'Visa Card (Test)'
  },
  mastercard: {
    number: '5555555555554444',
    description: 'MasterCard (Test)'
  }
};

// SSLCommerz sandbox information
export const SSLCOMMERZ_INFO = {
  sandbox_url: 'https://sandbox.sslcommerz.com',
  merchant_panel: 'https://sandbox.sslcommerz.com/manage/',
  store_name: 'testnahdaykuq',
  registered_url: 'https://an-nahda-academy.vercel.app/'
}; 