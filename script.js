require('dotenv').config();
const axios = require('axios');

// Datos desde .env
const phoneNumberId = process.env.PHONE_NUMBER_ID;
const accessToken = process.env.ACCESS_TOKEN;
const pin = process.env.PIN;
const certificate = `CmMKHwi92Nn3+KXTAxIGZW50OndhIgZJbmdlbWVQwrGHvgYaQHtxrkrbwmc97M9zwSCv8qCF+MVCyADktY/jP+P4eu6jgiHfR+32pGMh/odSRDd7a/iX2C3J0qz/RwnJI4VH3w0SMG0/N+DamrS08Fqzt5ylbCiTWOTiWsf2JF4OMM8zOtxeKbjpQ0MdMLfMgw3Qs/38Fw==`;
const method = 'sms'; // También 'voice'

// Endpoint de registro
const endpoint = `https://graph.facebook.com/v19.0/${phoneNumberId}/register`;

async function registerPhoneNumber() {
    try {
        const response = await axios.post(
            endpoint,
            {
                messaging_product: 'whatsapp', // ✅ Obligatorio
                method,
                cert: certificate,
                pin: pin // 🔒 ✅ Parche agregado
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log('📩 Respuesta del servidor:', response.data);
    } catch (error) {
        if (error.response) {
            console.error(`❌ Error ${error.response.status}:`, error.response.data);
        } else {
            console.error(`❌ Error en la solicitud:`, error.message);
        }
    }
}

registerPhoneNumber();