const businessConfig = {
supabase: {
    url: "https://wulcdmfqqgduytsirrwg.supabase.co",
    key: "sb_publishable_wCNTVIOAsKo_UVcCKxCQbQ_k07pAiKF"
},
    /* =====================================================
       BUSINESS DETAILS
    ===================================================== */

    businessName: "Jhalawar Pure & Fresh Organic Milk",

    brandName: "Jhalawar Organic Milk",

    tagline: "Pure • Fresh • Trusted",

    ownerName: "Bhupendra Gurjar",

    phoneNumber: "8890017418",

    whatsappNumber: "918890017418",

    instagramHandle: "jhalawarorganicmilk",

    instagramUrl:
        "https://www.instagram.com/jhalawarorganicmilk/",

    instagramContactNumber: "9413364709",


    /* =====================================================
       PAYMENT
    ===================================================== */

    paymentNumber: "8890017418",
upiId: "8890017418@ybl",


    /* =====================================================
       LOCATION
    ===================================================== */

    shopAddress:
        "Jhalrapatan, Jhalawar, Rajasthan",

    googleMapsLink: " https://maps.app.goo.gl/ZgYbWxYCEt8MTyN58",


    /* =====================================================
       DELIVERY
    ===================================================== */

    deliveryStartTime: "6:00 AM",

    deliveryEndTime: "12:00 PM",

    deliveryCharge: 0,

    deliveryAreas: [
        "Jhalawar, Rajasthan"
    ],


    /* =====================================================
       PRODUCTS
    ===================================================== */

    products: {

        /* -------------------------------------------------
           MILK
        ------------------------------------------------- */

        milk: {

            name: "Fresh Milk",

            price: 65,

            cowMilkPrice: 65,

            buffaloMilkPrice: 75,

            unit: "litre",

            quantities: [
                "500 ml",
                "1 Litre",
                "2 Litres"
            ],

            image:
                "images/milk.jpg",

            variants: [
                "Cow Milk",
                "Buffalo Milk"
            ]
        },


        /* -------------------------------------------------
           DAHI
        ------------------------------------------------- */

        curd: {

            name: "Fresh Dahi",

            price: 120,

            unit: "Kg",

            quantities: [
                "250 g",
                "500 g",
                "1 Kg"
            ],

            image:
                "images/curd.jpg"
        },


        /* -------------------------------------------------
           CHAACH
        ------------------------------------------------- */

        buttermilk: {

            name: "Fresh Chhach",

            price: 30,

            unit: "litre",

            quantities: [
                "250 ml",
                "500 ml",
                "1 Litre"
            ],

            image:
                "images/buttermilk.jpg"
        },


        /* -------------------------------------------------
           GHEE
        ------------------------------------------------- */

        ghee: {

            name: "Pure Desi Ghee",

            price: 1499,

            unit: "Kg",

            quantities: [
                "250 g",
                "500 g",
                "1 Kg"
            ],

            image:
                "images/ghee.jpg",

            variants: {

                cow: {
                    name: "Cow Ghee",
                    price: 1499,
                    unit: "1 Kg"
                },

                buffalo: {
                    name: "Buffalo Ghee",
                    price: 1299,
                    unit: "1 Kg"
                }
            }
        },


        /* -------------------------------------------------
           MAWA
           NOTE: HTML CARD ABHI BANANA BAAKI HAI
        ------------------------------------------------- */

        mawa: {

            name: "Fresh Mawa",

            price: 450,

            unit: "Kg",

            quantities: [
                "250 g",
                "500 g",
                "1 Kg"
            ],

            image:
                "images/mawa.jpg"
        }

    },


    /* =====================================================
       GLASS BOTTLE
    ===================================================== */

    bottle: {

        enabled: true,

        title:
            "Reusable Glass Milk Bottle",

        description:
            "Milk is delivered in glass bottles. Empty bottles are required to be returned.",

        emptyBottleReturnRequired:
            true
    },


    /* =====================================================
       SPECIALTIES
    ===================================================== */

    specialties: [

        "Fresh & Pure Milk",

        "Farm Fresh Quality",

        "Quality Guaranteed",

        "Free Home Delivery",

        "Milk delivered in Glass Bottles",

        "Pure Desi Ghee",

        "Fresh Dahi, Chhach & Mawa"

    ],


    /* =====================================================
       OFFERS
    ===================================================== */

    offers: {

        referral: {

            enabled: true,

            title:
                "New Customer Referral",

            description:
                "Get 1 litre milk free on every new customer referral."
        },


        trial: {

            enabled: true,

            title:
                "Free Trial Sample",

            description:
                "Free 200 ml sample for 2 days."
        }

    },


    /* =====================================================
       SUBSCRIPTION
    ===================================================== */

    subscription: {

        enabled: true,

        product: "milk",

        defaultDays: 30,

        quantityOptions: [
            0.5,
            1,
            2
        ]
    },


    /* =====================================================
       IMAGES
    ===================================================== */

    images: {

        logo:
            "images/logo.png",

        hero:
            "images/hero.jpg",

        milk:
            "images/milk.jpg",

        curd:
            "images/curd.jpg",

        buttermilk:
            "images/buttermilk.jpg",

        ghee:
            "images/ghee.jpg",

        bottle:
            "images/bottle.jpg",

        brandBanner:
            "images/brand-banner.jpg",

        deliveryBanner:
            "images/delivery-banner.jpg",

        brandBanner2:
            "images/brand-banner-2.jpg",

        owner:
            "images/owner.jpg",

        mawa:
            "images/mawa.jpg"
    }

};