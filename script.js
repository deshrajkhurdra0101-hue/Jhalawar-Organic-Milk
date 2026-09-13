/* =========================================================
   JHALAWAR PURE & FRESH ORGANIC MILK
   MAIN WEBSITE JAVASCRIPT
========================================================= */


/* =========================================================
   1. LOAD BUSINESS CONFIG
========================================================= */

function getWebsiteConfig() {

    const savedData =
        localStorage.getItem("jhalawarWebsiteData");

    if (!savedData) {
        return businessConfig;
    }

    try {

        const saved =
            JSON.parse(savedData);

        const data = {

            ...businessConfig,
            ...saved,

            products: {

                ...businessConfig.products,

                milk: {
                    ...businessConfig.products.milk,
                    ...(saved.products?.milk || {})
                },

                curd: {
                    ...businessConfig.products.curd,
                    ...(saved.products?.curd || {})
                },

                buttermilk: {
                    ...businessConfig.products.buttermilk,
                    ...(saved.products?.buttermilk || {})
                },

                ghee: {
                    ...businessConfig.products.ghee,
                    ...(saved.products?.ghee || {})
                },

                mawa: {
                    ...businessConfig.products.mawa,
                    ...(saved.products?.mawa || {})
                }

            },

            bottle: {
                ...businessConfig.bottle,
                ...(saved.bottle || {})
            },

            offers: {
                ...businessConfig.offers,
                ...(saved.offers || {})
            },

            subscription: {
                ...businessConfig.subscription,
                ...(saved.subscription || {})
            },

            images: {
                ...businessConfig.images,
                ...(saved.images || {})
            }

        };


        /* -------------------------------------------------
           DEFAULT MILK PRICES
        ------------------------------------------------- */

        if (
            !Number.isFinite(
                Number(data.products.milk.price)
            ) ||
            Number(data.products.milk.price) <= 0
        ) {

            data.products.milk.price =
                businessConfig.products.milk.price;

        }


        if (
            !Number.isFinite(
                Number(data.products.milk.cowMilkPrice)
            ) ||
            Number(data.products.milk.cowMilkPrice) <= 0
        ) {

            data.products.milk.cowMilkPrice = 65;

        }


        if (
            !Number.isFinite(
                Number(data.products.milk.buffaloMilkPrice)
            ) ||
            Number(data.products.milk.buffaloMilkPrice) <= 0
        ) {

            data.products.milk.buffaloMilkPrice = 75;

        }


        /* -------------------------------------------------
           CURD
        ------------------------------------------------- */

        if (
            !Number.isFinite(
                Number(data.products.curd.price)
            ) ||
            Number(data.products.curd.price) <= 0
        ) {

            data.products.curd.price = 120;

        }


        /* -------------------------------------------------
           BUTTERMILK
        ------------------------------------------------- */

        if (
            !Number.isFinite(
                Number(data.products.buttermilk.price)
            ) ||
            Number(data.products.buttermilk.price) <= 0
        ) {

            data.products.buttermilk.price = 30;

        }


        /* -------------------------------------------------
           GHEE
        ------------------------------------------------- */

        if (
            !Number.isFinite(
                Number(data.products.ghee.price)
            ) ||
            Number(data.products.ghee.price) <= 0
        ) {

            data.products.ghee.price = 1499;

        }


        if (data.products.ghee.variants) {

            if (
                !Number.isFinite(
                    Number(
                        data.products.ghee.variants.cow?.price
                    )
                ) ||
                Number(
                    data.products.ghee.variants.cow?.price
                ) <= 0
            ) {

                data.products.ghee.variants.cow.price =
                    1499;

            }


            if (
                !Number.isFinite(
                    Number(
                        data.products.ghee.variants.buffalo?.price
                    )
                ) ||
                Number(
                    data.products.ghee.variants.buffalo?.price
                ) <= 0
            ) {

                data.products.ghee.variants.buffalo.price =
                    1299;

            }

        }


        /* -------------------------------------------------
           LOCATION
        ------------------------------------------------- */

        if (
            !data.shopAddress ||
            data.shopAddress === "SHOP_ADDRESS"
        ) {

            data.shopAddress =
                "Jhalrapatan, Jhalawar, Rajasthan";

        }


        /* -------------------------------------------------
           DELIVERY
        ------------------------------------------------- */

        if (!data.deliveryStartTime) {

            data.deliveryStartTime =
                "6:00 AM";

        }


        if (!data.deliveryEndTime) {

            data.deliveryEndTime =
                "12:00 PM";

        }


        if (data.deliveryCharge === undefined) {

            data.deliveryCharge = 0;

        }


        return data;

    } catch (error) {

        console.error(
            "Could not load saved website data:",
            error
        );

        return businessConfig;

    }

}


/* =========================================================
   2. GLOBAL WEBSITE DATA
========================================================= */

const siteData =
    getWebsiteConfig();


/* =========================================================
   3. HELPER FUNCTIONS
========================================================= */

function getElement(id) {

    return document.getElementById(id);

}


/* ---------------------------------------------------------
   CLEAN PHONE NUMBER
--------------------------------------------------------- */

function cleanPhoneNumber(number) {

    return String(number || "")
        .replace(/\D/g, "");

}


/* ---------------------------------------------------------
   CREATE WHATSAPP URL
--------------------------------------------------------- */

function createWhatsAppUrl(message) {

    const phone =
        cleanPhoneNumber(
            siteData.whatsappNumber
        );


    if (!phone) {

        console.error(
            "WhatsApp number is missing."
        );

        return "#";

    }


    return (
        `https://wa.me/${phone}` +
        `?text=${encodeURIComponent(message)}`
    );

}


/* =========================================================
   4. MOBILE MENU
========================================================= */

const menuButton =
    getElement("menu-button");

const mobileMenu =
    getElement("mobile-menu");


if (
    menuButton &&
    mobileMenu
) {

    menuButton.addEventListener(
        "click",
        () => {

            const isOpen =
                mobileMenu.classList.toggle(
                    "active"
                );


            mobileMenu.classList.toggle(
                "open",
                isOpen
            );


            menuButton.textContent =
                isOpen
                    ? "✕"
                    : "☰";


            menuButton.setAttribute(
                "aria-label",
                isOpen
                    ? "Close menu"
                    : "Open menu"
            );

        }
    );


    mobileMenu
        .querySelectorAll("a")
        .forEach(
            (link) => {

                link.addEventListener(
                    "click",
                    () => {

                        mobileMenu.classList.remove(
                            "active",
                            "open"
                        );


                        menuButton.textContent =
                            "☰";


                        menuButton.setAttribute(
                            "aria-label",
                            "Open menu"
                        );

                    }
                );

            }
        );

}


/* =========================================================
   5. BUSINESS INFORMATION
========================================================= */

function loadBusinessInformation() {


    /* -----------------------------------------------------
       BUSINESS NAME
    ----------------------------------------------------- */

    const logoStrong =
        document.querySelector(
            ".logo-text strong"
        );


    if (
        logoStrong &&
        siteData.businessName
    ) {

        logoStrong.textContent =
            siteData.businessName;

    }


    /* -----------------------------------------------------
       BRAND NAME
    ----------------------------------------------------- */

    const logoSpan =
        document.querySelector(
            ".logo-text span"
        );


    if (
        logoSpan &&
        siteData.brandName
    ) {

        logoSpan.textContent =
            siteData.brandName;

    }


    /* -----------------------------------------------------
       OWNER
    ----------------------------------------------------- */

    const ownerName =
        getElement("owner-name");


    if (
        ownerName &&
        siteData.ownerName &&
        siteData.ownerName !== "OWNER_NAME"
    ) {

        ownerName.textContent =
            `Owner: ${siteData.ownerName}`;

    }


    /* -----------------------------------------------------
       SHOP ADDRESS
    ----------------------------------------------------- */

    const shopAddress =
        getElement("shop-address");


    if (
        shopAddress &&
        siteData.shopAddress &&
        siteData.shopAddress !== "SHOP_ADDRESS"
    ) {

        shopAddress.textContent =
            siteData.shopAddress;

        shopAddress.style.display =
            "";

    }


    /* -----------------------------------------------------
       DELIVERY TIME
    ----------------------------------------------------- */

    const deliveryTime =
        getElement("delivery-time");


    if (
        deliveryTime &&
        siteData.deliveryStartTime &&
        siteData.deliveryEndTime
    ) {

        deliveryTime.textContent =
            `${siteData.deliveryStartTime} – ${siteData.deliveryEndTime}`;

    }


    /* -----------------------------------------------------
       CONTACT NUMBER
    ----------------------------------------------------- */

    const contactNumber =
        getElement("contact-number");


    if (
        contactNumber &&
        siteData.phoneNumber
    ) {

        contactNumber.textContent =
            siteData.phoneNumber;

    }


    /* -----------------------------------------------------
       INSTAGRAM
    ----------------------------------------------------- */

    const instagramHandle =
        getElement("instagram-handle");


    if (
        instagramHandle &&
        siteData.instagramHandle
    ) {

        instagramHandle.textContent =
            siteData.instagramHandle;

    }

}


/* =========================================================
   6. LOAD PRODUCT DATA
========================================================= */

function loadProductData() {

    if (!siteData.products) {
        return;
    }


    /* -----------------------------------------------------
       PRODUCT PRICES
       
       IMPORTANT:
       Yahan sirf base price load hoga.
       Milk/Ghee variant price alag functions
       se handle hoga.
    ----------------------------------------------------- */

    document
        .querySelectorAll(
            "[data-product-price]"
        )
        .forEach(
            (element) => {

                const productName =
                    element.dataset.productPrice;


                const product =
                    siteData.products[
                        productName
                    ];


                if (
                    product &&
                    product.price !== undefined
                ) {

                    const price =
                        Number(
                            product.price
                        );


                    element.textContent =
                        Number.isFinite(price) &&
                        price > 0
                            ? price.toLocaleString(
                                "en-IN"
                            )
                            : "--";

                }

            }
        );


    /* -----------------------------------------------------
       PRODUCT IMAGES
    ----------------------------------------------------- */

    const productImageMap = {

        milk:
            'article[data-product="milk"] .product-image img',

        curd:
            'article[data-product="curd"] .product-image img',

        buttermilk:
            'article[data-product="buttermilk"] .product-image img',

        ghee:
            'article[data-product="ghee"] .product-image img'

    };


    Object.entries(
        productImageMap
    )
    .forEach(
        ([productName, selector]) => {

            const image =
                document.querySelector(
                    selector
                );


            const product =
                siteData.products[
                    productName
                ];


            if (
                image &&
                product &&
                product.image
            ) {

                image.src =
                    product.image;

            }

        }
    );


    /* -----------------------------------------------------
       QUANTITY BUTTONS
    ----------------------------------------------------- */

    document
        .querySelectorAll(
            ".quantity-options"
        )
        .forEach(
            (container) => {

                const productName =
                    container.dataset.product;


                const product =
                    siteData.products[
                        productName
                    ];


                if (
                    !product ||
                    !Array.isArray(
                        product.quantities
                    )
                ) {

                    return;

                }


                container.innerHTML =
                    "";


                product.quantities
                    .forEach(
                        (quantity, index) => {

                            const button =
                                document.createElement(
                                    "button"
                                );


                            button.type =
                                "button";


                            button.classList.add(
                                "quantity-button"
                            );


                            button.textContent =
                                quantity;


                            button.dataset.quantity =
                                quantity;


                            if (
                                index === 0
                            ) {

                                button.classList.add(
                                    "active"
                                );

                            }


                            button.addEventListener(
                                "click",
                                () => {

                                    container
                                        .querySelectorAll(
                                            "button"
                                        )
                                        .forEach(
                                            (item) => {

                                                item.classList.remove(
                                                    "active"
                                                );

                                            }
                                        );


                                    button.classList.add(
                                        "active"
                                    );

                                }
                            );


                            container.appendChild(
                                button
                            );

                        }
                    );

            }
        );

}


/* =========================================================
   PART 1 END
========================================================= */
/* =========================================================
   7. HERO IMAGE
========================================================= */

function loadHeroImage() {

    const heroImage =
        document.querySelector(
            ".hero-image-card img"
        );


    if (
        heroImage &&
        siteData.images &&
        siteData.images.hero
    ) {

        heroImage.src =
            siteData.images.hero;

    }

}


/* =========================================================
   8. LOGO IMAGE
========================================================= */

function loadLogoImage() {

    const logoImage =
        document.querySelector(
            ".logo-image img"
        );


    if (
        logoImage &&
        siteData.images &&
        siteData.images.logo
    ) {

        logoImage.src =
            siteData.images.logo;

    }

}


/* =========================================================
   9. DELIVERY IMAGE
========================================================= */

function loadDeliveryImage() {

    const deliveryImage =
        document.querySelector(
            ".delivery-story-image img"
        );


    if (
        deliveryImage &&
        siteData.images &&
        (
            siteData.images.deliveryBanner ||
            siteData.images.delivery
        )
    ) {

        deliveryImage.src =
            siteData.images.deliveryBanner ||
            siteData.images.delivery;

    }

}


/* =========================================================
   10. OWNER IMAGE
========================================================= */

function loadOwnerImage() {

    const ownerImage =
        document.querySelector(
            ".about-image img"
        );


    if (
        ownerImage &&
        siteData.images &&
        siteData.images.owner
    ) {

        ownerImage.src =
            siteData.images.owner;

    }

}


/* =========================================================
   11. LOAD ALL WEBSITE IMAGES
========================================================= */

function loadWebsiteImages() {

    if (!siteData.images) {
        return;
    }


    const heroImage =
        document.querySelector(
            ".hero-image-card img"
        );


    if (
        heroImage &&
        siteData.images.hero
    ) {

        heroImage.src =
            siteData.images.hero;

    }


    const logoImage =
        document.querySelector(
            ".logo-image img"
        );


    if (
        logoImage &&
        siteData.images.logo
    ) {

        logoImage.src =
            siteData.images.logo;

    }


    const deliveryImage =
        document.querySelector(
            ".delivery-story-image img"
        );


    if (
        deliveryImage &&
        (
            siteData.images.deliveryBanner ||
            siteData.images.delivery
        )
    ) {

        deliveryImage.src =
            siteData.images.deliveryBanner ||
            siteData.images.delivery;

    }


    const ownerImage =
        document.querySelector(
            ".about-image img"
        );


    if (
        ownerImage &&
        siteData.images.owner
    ) {

        ownerImage.src =
            siteData.images.owner;

    }


    const productImages = {

        milk:
            siteData.images.milk,

        curd:
            siteData.images.curd,

        buttermilk:
            siteData.images.buttermilk,

        ghee:
            siteData.images.ghee

    };


    Object.entries(
        productImages
    )
    .forEach(
        ([productKey, imagePath]) => {

            const image =
                document.querySelector(
                    `article[data-product="${productKey}"] .product-image img`
                );


            if (
                image &&
                imagePath
            ) {

                image.src =
                    imagePath;

            }

        }
    );


    const brandBanners =
        document.querySelectorAll(
            ".brand-banner img"
        );


    if (
        brandBanners[0] &&
        siteData.images.brandBanner
    ) {

        brandBanners[0].src =
            siteData.images.brandBanner;

    }


    if (
        brandBanners[1] &&
        siteData.images.brandBanner2
    ) {

        brandBanners[1].src =
            siteData.images.brandBanner2;

    }

}


/* =========================================================
   12. WHATSAPP MAIN BUTTONS
========================================================= */

function setupWhatsAppButtons() {

    const message = `
Hello, I want to order from ${siteData.businessName}.

Please share the available products, prices and delivery details.

Thank you.
    `.trim();


    const whatsappUrl =
        createWhatsAppUrl(message);


    const buttonIds = [

        "nav-whatsapp-button",
        "mobile-whatsapp-button",
        "whatsapp-button",
        "footer-whatsapp"

    ];


    buttonIds.forEach(
        (id) => {

            const button =
                getElement(id);


            if (
                button &&
                whatsappUrl !== "#"
            ) {

                button.href =
                    whatsappUrl;

                button.target =
                    "_blank";

                button.rel =
                    "noopener noreferrer";

            }

        }
    );

}


/* =========================================================
   13. PRODUCT WHATSAPP ORDERS
========================================================= */


/* ---------------------------------------------------------
   GET SELECTED QUANTITY
--------------------------------------------------------- */

function getSelectedProductQuantity(
    productName
) {

    const container =
        document.querySelector(
            `.quantity-options[data-product="${productName}"]`
        );


    if (!container) {
        return "";
    }


    const activeButton =
        container.querySelector(
            "button.active"
        );


    if (!activeButton) {

        const firstButton =
            container.querySelector(
                "button"
            );


        return firstButton
            ? firstButton.dataset.quantity
            : "";

    }


    return activeButton.dataset.quantity;

}


/* ---------------------------------------------------------
   GET SELECTED MILK VARIANT
--------------------------------------------------------- */

function getSelectedMilkVariant() {

    const milkCard =
        document.querySelector(
            'article[data-product="milk"]'
        );


    if (!milkCard) {
        return "Cow Milk";
    }


    const activeVariant =
        milkCard.querySelector(
            ".variant-button.active"
        );


    return activeVariant
        ? activeVariant.dataset.variant
        : "Cow Milk";

}


/* ---------------------------------------------------------
   GET SELECTED GHEE VARIANT
--------------------------------------------------------- */

function getSelectedGheeVariant() {

    const gheeCard =
        document.querySelector(
            'article[data-product="ghee"]'
        );


    if (!gheeCard) {
        return "Cow Ghee";
    }


    const activeVariant =
        gheeCard.querySelector(
            ".ghee-types span.active"
        );


    if (activeVariant) {

        return activeVariant.textContent.trim();

    }


    const spans =
        gheeCard.querySelectorAll(
            ".ghee-types span"
        );


    return spans.length
        ? spans[0].textContent.trim()
        : "Cow Ghee";

}


/* ---------------------------------------------------------
   MILK VARIANT PRICE
--------------------------------------------------------- */

function loadMilkVariantPrice() {

    const priceElement =
        document.querySelector(
            '[data-product-price="milk"]'
        );


    const milk =
        siteData.products?.milk;


    if (
        !priceElement ||
        !milk
    ) {

        return;

    }


    const variant =
        getSelectedMilkVariant();


    let price =
        Number(milk.cowMilkPrice) || 65;


    if (
        variant === "Buffalo Milk"
    ) {

        price =
            Number(milk.buffaloMilkPrice) || 75;

    }


    priceElement.textContent =
        Number.isFinite(price) &&
        price > 0
            ? price.toLocaleString(
                "en-IN"
            )
            : "--";

}


/* ---------------------------------------------------------
   GHEE VARIANT PRICE
--------------------------------------------------------- */

function loadGheeVariantPrice() {

    const priceElement =
        document.querySelector(
            '[data-product-price="ghee"]'
        );


    const ghee =
        siteData.products?.ghee;


    if (
        !priceElement ||
        !ghee
    ) {

        return;

    }


    const variant =
        getSelectedGheeVariant();


    let price = 1499;


    if (
        variant === "Buffalo Desi Ghee"
    ) {

        price = 1299;

    }


    if (
        variant === "Cow Ghee"
    ) {

        price = 1499;

    }


    if (
        ghee.variants?.cow?.price
    ) {

        if (
            variant === "Cow Ghee"
        ) {

            price =
                Number(
                    ghee.variants.cow.price
                ) || 1499;

        }

    }


    if (
        ghee.variants?.buffalo?.price
    ) {

        if (
            variant === "Buffalo Desi Ghee"
        ) {

            price =
                Number(
                    ghee.variants.buffalo.price
                ) || 1299;

        }

    }


    priceElement.textContent =
        Number.isFinite(price) &&
        price > 0
            ? price.toLocaleString(
                "en-IN"
            )
            : "--";

}


/* ---------------------------------------------------------
   SETUP MILK VARIANTS
--------------------------------------------------------- */

function setupMilkVariants() {

    const milkCard =
        document.querySelector(
            'article[data-product="milk"]'
        );


    if (!milkCard) {
        return;
    }


    const buttons =
        milkCard.querySelectorAll(
            ".variant-button"
        );


    buttons.forEach(
        (button) => {

            button.addEventListener(
                "click",
                () => {

                    buttons.forEach(
                        (item) => {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    button.classList.add(
                        "active"
                    );


                    loadMilkVariantPrice();


                    calculateSubscription();

                }
            );

        }
    );

}


/* ---------------------------------------------------------
   SETUP GHEE VARIANTS
--------------------------------------------------------- */

function setupGheeVariants() {

    const gheeCard =
        document.querySelector(
            'article[data-product="ghee"]'
        );


    if (!gheeCard) {
        return;
    }


    const buttons =
        gheeCard.querySelectorAll(
            ".ghee-types span"
        );


    buttons.forEach(
        (button) => {

            button.addEventListener(
                "click",
                () => {

                    buttons.forEach(
                        (item) => {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    button.classList.add(
                        "active"
                    );


                    loadGheeVariantPrice();

                }
            );

        }
    );

}


/* =========================================================
   14. PRODUCT ORDER BUTTONS
========================================================= */

function setupProductOrderButtons() {

    document
        .querySelectorAll(
            ".product-order-button"
        )
        .forEach(
            (button) => {

                button.addEventListener(
                    "click",
                    () => {

                        const productKey =
                            button.dataset.product;


                        const product =
                            siteData.products[
                                productKey
                            ];


                        if (!product) {

                            console.error(
                                "Product not found:",
                                productKey
                            );

                            return;

                        }


                        const quantity =
                            getSelectedProductQuantity(
                                productKey
                            );


                        let variantText =
                            "";


                        let price =
                            Number(
                                product.price
                            );


                        /* ---------------------------------
                           MILK PRICE
                        --------------------------------- */

                        if (
                            productKey === "milk"
                        ) {

                            variantText =
                                getSelectedMilkVariant();


                            if (
                                variantText ===
                                "Buffalo Milk"
                            ) {

                                price =
                                    Number(
                                        product.buffaloMilkPrice
                                    ) || 75;

                            } else {

                                price =
                                    Number(
                                        product.cowMilkPrice
                                    ) || 65;

                            }

                        }


                        /* ---------------------------------
                           GHEE PRICE
                        --------------------------------- */

                        if (
                            productKey === "ghee"
                        ) {

                            variantText =
                                getSelectedGheeVariant();


                            if (
                                variantText ===
                                "Buffalo Desi Ghee"
                            ) {

                                price =
                                    Number(
                                        product
                                            .variants
                                            ?.buffalo
                                            ?.price
                                    ) || 1299;

                            } else {

                                price =
                                    Number(
                                        product
                                            .variants
                                            ?.cow
                                            ?.price
                                    ) || 1499;

                            }

                        }


                        const priceText =
                            Number.isFinite(price) &&
                            price > 0
                                ? `₹${price.toLocaleString(
                                    "en-IN"
                                )}`
                                : "Price to be confirmed";


                        const message = `
Hello, I want to order from ${siteData.businessName}.

Product: ${product.name}

${variantText
    ? `Type: ${variantText}`
    : ""}

Quantity: ${quantity || "Please confirm"}

Price: ${priceText}

Customer Name:
Delivery Area:
Delivery Address:

Please confirm my order.
                        `.trim();


                        const url =
                            createWhatsAppUrl(
                                message
                            );


                        if (
                            url !== "#"
                        ) {

                            window.open(
                                url,
                                "_blank",
                                "noopener,noreferrer"
                            );

                        }

                    }
                );

            }
        );

}


/* =========================================================
   PART 2 END
========================================================= */
/* =========================================================
   15. SUBSCRIPTION CALCULATOR
========================================================= */


/* ---------------------------------------------------------
   SUBSCRIPTION ELEMENTS
--------------------------------------------------------- */

const subscriptionProduct =
    getElement("subscription-product");

const dailyQuantity =
    getElement("daily-quantity");

const subscriptionDays =
    getElement("subscription-days");

const monthlyQuantity =
    getElement("monthly-quantity");

const monthlyPrice =
    getElement("monthly-price");


/* ---------------------------------------------------------
   UPDATE DAILY QUANTITY OPTIONS
--------------------------------------------------------- */

function updateSubscriptionQuantityOptions() {

    if (!subscriptionProduct || !dailyQuantity) {
        return;
    }


    const productKey =
        subscriptionProduct.value;


    let options = [];


    /* ---------------- MILK ---------------- */

    if (productKey === "milk") {

        options = [
            {
                value: "0.5",
                text: "500 ml"
            },
            {
                value: "1",
                text: "1 Litre"
            },
            {
                value: "2",
                text: "2 Litres"
            }
        ];

    }


    /* ---------------- DAHI ---------------- */

    if (productKey === "curd") {

        options = [
            {
                value: "0.25",
                text: "250 g"
            },
            {
                value: "0.5",
                text: "500 g"
            },
            {
                value: "1",
                text: "1 Kg"
            }
        ];

    }


    /* ---------------- CHHACH ---------------- */

    if (productKey === "buttermilk") {

        options = [
            {
                value: "0.25",
                text: "250 ml"
            },
            {
                value: "0.5",
                text: "500 ml"
            },
            {
                value: "1",
                text: "1 Litre"
            }
        ];

    }


    dailyQuantity.innerHTML = "";


    options.forEach(
        (option) => {

            const element =
                document.createElement(
                    "option"
                );


            element.value =
                option.value;


            element.textContent =
                option.text;


            dailyQuantity.appendChild(
                element
            );

        }
    );


    calculateSubscription();

}


/* ---------------------------------------------------------
   CALCULATE SUBSCRIPTION
--------------------------------------------------------- */

function calculateSubscription() {

    if (
        !subscriptionProduct ||
        !dailyQuantity ||
        !subscriptionDays ||
        !monthlyQuantity ||
        !monthlyPrice
    ) {

        return;

    }


    const productKey =
        subscriptionProduct.value;


    const quantity =
        Number(
            dailyQuantity.value
        );


    const days =
        Number(
            subscriptionDays.value
        );


    const product =
        siteData.products?.[
            productKey
        ];


    if (
        !product ||
        !Number.isFinite(quantity) ||
        !Number.isFinite(days) ||
        quantity <= 0 ||
        days <= 0
    ) {

        monthlyQuantity.textContent =
            "--";


        monthlyPrice.textContent =
            "₹--";


        return;

    }


    /* -----------------------------------------------------
       PRODUCT PRICE
    ----------------------------------------------------- */

    const price =
        Number(
            product.price
        );


    if (
        !Number.isFinite(price) ||
        price <= 0
    ) {

        monthlyQuantity.textContent =
            "--";


        monthlyPrice.textContent =
            "₹--";


        return;

    }


    /* -----------------------------------------------------
       TOTAL QUANTITY
    ----------------------------------------------------- */

    const totalQuantity =
        quantity * days;


    /* -----------------------------------------------------
       TOTAL PRICE
    ----------------------------------------------------- */

    const totalAmount =
        totalQuantity * price;


    /* -----------------------------------------------------
       UNIT
    ----------------------------------------------------- */

    let unit = "";


    if (
        productKey === "milk"
    ) {

        unit = "L";

    }


    if (
        productKey === "curd"
    ) {

        unit = "Kg";

    }


    if (
        productKey === "buttermilk"
    ) {

        unit = "L";

    }


    /* -----------------------------------------------------
       SHOW RESULT
    ----------------------------------------------------- */

    monthlyQuantity.textContent =
        `${totalQuantity.toFixed(2)} ${unit}`;


    monthlyPrice.textContent =
        `₹${totalAmount.toLocaleString(
            "en-IN",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        )}`;

}


/* ---------------------------------------------------------
   PRODUCT CHANGE
--------------------------------------------------------- */

if (subscriptionProduct) {

    subscriptionProduct.addEventListener(
        "change",
        () => {

            updateSubscriptionQuantityOptions();

        }
    );

}


/* ---------------------------------------------------------
   QUANTITY CHANGE
--------------------------------------------------------- */

if (dailyQuantity) {

    dailyQuantity.addEventListener(
        "change",
        calculateSubscription
    );

}


/* ---------------------------------------------------------
   DAYS CHANGE
--------------------------------------------------------- */

if (subscriptionDays) {

    subscriptionDays.addEventListener(
        "input",
        calculateSubscription
    );

}


/* =========================================================
   16. SUBSCRIPTION WHATSAPP
========================================================= */

const subscriptionWhatsAppButton =
    getElement(
        "subscription-whatsapp-button"
    );


if (
    subscriptionWhatsAppButton
) {

    subscriptionWhatsAppButton.addEventListener(
        "click",
        () => {

            calculateSubscription();


            const productKey =
                subscriptionProduct
                    ? subscriptionProduct.value
                    : "milk";


            const product =
                siteData.products?.[
                    productKey
                ];


            const quantity =
                dailyQuantity
                    ? dailyQuantity.options[
                        dailyQuantity.selectedIndex
                    ]?.textContent
                    : "";


            const days =
                subscriptionDays
                    ? subscriptionDays.value
                    : "";


            const totalQuantity =
                monthlyQuantity
                    ? monthlyQuantity.textContent
                    : "--";


            const totalAmount =
                monthlyPrice
                    ? monthlyPrice.textContent
                    : "₹--";


            const productName =
                product?.name ||
                "Product";


            const message = `
Hello, I want to start a subscription.

Business:
${siteData.businessName}

Product:
${productName}

Daily Quantity:
${quantity || "Please confirm"}

Number of Days:
${days}

Total Quantity:
${totalQuantity}

Estimated Amount:
${totalAmount}

Customer Name:
Delivery Area:
Delivery Address:

Please confirm my subscription.
            `.trim();


            const url =
                createWhatsAppUrl(
                    message
                );


            if (
                url !== "#"
            ) {

                window.open(
                    url,
                    "_blank",
                    "noopener,noreferrer"
                );

            }

        }
    );

}


/* =========================================================
   PART 3 END
========================================================= */
/* =========================================================
   17. CALL BUTTON
========================================================= */

function setupCallButton() {

    const callButton =
        getElement("call-button");


    if (
        !callButton ||
        !siteData.phoneNumber
    ) {

        return;

    }


    const phone =
        cleanPhoneNumber(
            siteData.phoneNumber
        );


    if (!phone) {
        return;
    }


    callButton.href =
        `tel:${phone}`;

}


/* =========================================================
   18. INSTAGRAM
========================================================= */

function setupInstagram() {

    const instagramHandle =
        getElement(
            "instagram-handle"
        );


    if (
        instagramHandle &&
        siteData.instagramHandle
    ) {

        instagramHandle.textContent =
            `@${String(
                siteData.instagramHandle
            ).replace(/^@/, "")}`;

    }


    const footerInstagram =
        document.querySelector(
            '.footer-contact a[href*="instagram"]'
        );


    if (
        footerInstagram &&
        siteData.instagramUrl
    ) {

        footerInstagram.href =
            siteData.instagramUrl;

        footerInstagram.target =
            "_blank";

        footerInstagram.rel =
            "noopener noreferrer";

    }

}


/* =========================================================
   19. GOOGLE MAPS
========================================================= */

function setupGoogleMaps() {

    const mapButton =
        getElement(
            "google-maps-link"
        );


    if (!mapButton) {
        return;
    }


    if (
        siteData.googleMapsLink &&
        siteData.googleMapsLink !==
            "GOOGLE_MAPS_LINK"
    ) {

        mapButton.href =
            siteData.googleMapsLink;

        mapButton.target =
            "_blank";

        mapButton.rel =
            "noopener noreferrer";

        mapButton.style.display =
            "";

    } else {

        mapButton.href =
            "#";

        mapButton.style.display =
            "none";

    }

}


/* =========================================================
   20. PAYMENT COPY
========================================================= */

const copyPaymentButton =
    getElement(
        "copy-payment-button"
    );


if (copyPaymentButton) {

    copyPaymentButton.addEventListener(
        "click",
        async () => {

            const paymentNumber =
                siteData.paymentNumber;


            if (
                !paymentNumber ||
                paymentNumber ===
                    "PAYMENT_NUMBER"
            ) {

                alert(
                    "Payment details are not available yet."
                );

                return;

            }


            try {

                await navigator.clipboard.writeText(
                    paymentNumber
                );


                const originalText =
                    copyPaymentButton.textContent;


                copyPaymentButton.textContent =
                    "Copied!";


                setTimeout(
                    () => {

                        copyPaymentButton.textContent =
                            originalText ||
                            "Copy";

                    },
                    1500
                );


            } catch (error) {

                console.error(
                    "Could not copy payment details:",
                    error
                );


                alert(
                    `Payment Number: ${paymentNumber}`
                );

            }

        }
    );

}


/* =========================================================
   21. PAYMENT INFORMATION
========================================================= */

function loadPaymentInformation() {

    const paymentNumber =
        getElement(
            "payment-number"
        );


    const upiId =
        getElement(
            "upi-id"
        );


    const validPayment =
        siteData.paymentNumber &&
        siteData.paymentNumber !==
            "PAYMENT_NUMBER";


    const validUpi =
        siteData.upiId &&
        siteData.upiId !==
            "UPI_ID";


    if (paymentNumber) {

        paymentNumber.textContent =
            validPayment
                ? siteData.paymentNumber
                : "Payment details coming soon.";

    }


    if (upiId) {

        upiId.textContent =
            validUpi
                ? siteData.upiId
                : "UPI details coming soon.";

    }

}


/* =========================================================
   22. DELIVERY AREAS
========================================================= */

function loadDeliveryAreas() {

    const deliveryAreas =
        getElement(
            "delivery-areas"
        );


    if (!deliveryAreas) {
        return;
    }


    if (
        !Array.isArray(
            siteData.deliveryAreas
        ) ||
        siteData.deliveryAreas.length === 0
    ) {

        deliveryAreas.innerHTML = `
            <span>
                Delivery areas will be updated soon.
            </span>
        `;

        return;

    }


    deliveryAreas.innerHTML =
        "";


    siteData.deliveryAreas
        .forEach(
            (area) => {

                if (!area) {
                    return;
                }


                const span =
                    document.createElement(
                        "span"
                    );


                span.textContent =
                    area;


                deliveryAreas.appendChild(
                    span
                );

            }
        );

}


/* =========================================================
   23. BOTTLE INFORMATION
========================================================= */

function setupBottleSection() {

    const bottleSection =
        document.querySelector(
            ".bottle-section"
        );


    if (!bottleSection) {
        return;
    }


    const bottle =
        siteData.bottle;


    if (
        !bottle ||
        bottle.enabled === false
    ) {

        bottleSection.style.display =
            "none";

        return;

    }


    const title =
        bottleSection.querySelector(
            "h2"
        );


    const description =
        bottleSection.querySelector(
            ".bottle-content > p"
        );


    if (
        title &&
        bottle.title
    ) {

        title.textContent =
            bottle.title;

    }


    if (
        description &&
        bottle.description
    ) {

        description.textContent =
            bottle.description;

    }

}


/* =========================================================
   24. OFFERS
========================================================= */

function setupOffers() {

    const offerCards =
        document.querySelectorAll(
            ".offer-card"
        );


    if (!offerCards.length) {
        return;
    }


    const offers =
        siteData.offers;


    if (!offers) {
        return;
    }


    /* -----------------------------------------------------
       REFERRAL OFFER
    ----------------------------------------------------- */

    if (
        offerCards[0] &&
        offers.referral
    ) {

        if (
            offers.referral.enabled === false
        ) {

            offerCards[0].style.display =
                "none";

        } else {

            const heading =
                offerCards[0].querySelector(
                    "h3"
                );


            const paragraph =
                offerCards[0].querySelector(
                    "p"
                );


            if (
                heading &&
                offers.referral.title
            ) {

                heading.textContent =
                    offers.referral.title;

            }


            if (
                paragraph &&
                offers.referral.description
            ) {

                paragraph.textContent =
                    offers.referral.description;

            }

        }

    }


    /* -----------------------------------------------------
       TRIAL OFFER
    ----------------------------------------------------- */

    if (
        offerCards[1] &&
        offers.trial
    ) {

        if (
            offers.trial.enabled === false
        ) {

            offerCards[1].style.display =
                "none";

        } else {

            const heading =
                offerCards[1].querySelector(
                    "h3"
                );


            const paragraph =
                offerCards[1].querySelector(
                    "p"
                );


            if (
                heading &&
                offers.trial.title
            ) {

                heading.textContent =
                    offers.trial.title;

            }


            if (
                paragraph &&
                offers.trial.description
            ) {

                paragraph.textContent =
                    offers.trial.description;

            }

        }

    }

}


/* =========================================================
   25. IMAGE FALLBACK
========================================================= */

function setupImageFallbacks() {

    document
        .querySelectorAll("img")
        .forEach(
            (image) => {

                image.addEventListener(
                    "error",
                    () => {

                        image.style.display =
                            "none";

                    }
                );

            }
        );

}


/* =========================================================
   26. SMOOTH NAVIGATION
========================================================= */

function setupSmoothNavigation() {

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(
            (link) => {

                link.addEventListener(
                    "click",
                    (event) => {

                        const targetId =
                            link.getAttribute(
                                "href"
                            );


                        if (
                            !targetId ||
                            targetId === "#"
                        ) {

                            return;

                        }


                        const target =
                            document.querySelector(
                                targetId
                            );


                        if (!target) {
                            return;
                        }


                        event.preventDefault();


                        target.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }
                );

            }
        );

}


/* =========================================================
   27. FINAL INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadBusinessInformation();

        loadProductData();

        loadHeroImage();

        loadLogoImage();

        loadDeliveryImage();

        loadOwnerImage();

        loadWebsiteImages();

        loadPaymentInformation();

        setupWhatsAppButtons();

        setupProductOrderButtons();

        setupMilkVariants();

        setupGheeVariants();

        loadMilkVariantPrice();

        loadGheeVariantPrice();

        updateSubscriptionQuantityOptions();

        calculateSubscription();

        setupCallButton();

        setupInstagram();

        setupGoogleMaps();

        loadDeliveryAreas();

        setupBottleSection();

        setupOffers();

        setupImageFallbacks();

        setupSmoothNavigation();

    }
);


/* =========================================================
   SCRIPT.JS COMPLETE
========================================================= */