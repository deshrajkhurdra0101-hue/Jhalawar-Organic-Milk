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
   SUPABASE CONNECTION
========================================================= */

const supabaseClient = window.supabase.createClient(
    businessConfig.supabase.url,
    businessConfig.supabase.key
);

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

function setupMobileMenu() {

    const menuButton =
        getElement("menu-button");

    const mobileMenu =
        getElement("mobile-menu");

    if (
        !menuButton ||
        !mobileMenu
    ) {
        return;
    }

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


    const ownerName =
        getElement("owner-name");

    if (
        ownerName &&
        siteData.ownerName
    ) {

        ownerName.textContent =
            `Owner: ${siteData.ownerName}`;

    }


    const shopAddress =
        getElement("shop-address");

    if (
        shopAddress &&
        siteData.shopAddress
    ) {

        shopAddress.textContent =
            siteData.shopAddress;

    }


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


    const contactNumber =
        getElement("contact-number");

    if (
        contactNumber &&
        siteData.phoneNumber
    ) {

        contactNumber.textContent =
            siteData.phoneNumber;

    }


    const instagramHandle =
        getElement("instagram-handle");

    if (
        instagramHandle &&
        siteData.instagramHandle
    ) {

        instagramHandle.textContent =
            `@${String(
                siteData.instagramHandle
            ).replace(/^@/, "")}`;

    }

}


/* =========================================================
   6. LOAD PRODUCT DATA
========================================================= */

function loadProductData() {

    if (!siteData.products) {
        return;
    }


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
                        Number(product.price);

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
========================================================= *//* =========================================================
   7. HERO IMAGE
========================================================= */

function loadHeroImage() {

    const heroImage =
        document.querySelector(
            ".hero-image-card img"
        );

    if (
        heroImage &&
        siteData.images?.hero
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
        siteData.images?.logo
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
        (
            siteData.images?.deliveryBanner ||
            siteData.images?.delivery
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
        siteData.images?.owner
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

    const imageMap = {

        ".hero-image-card img":
            siteData.images.hero,

        ".logo-image img":
            siteData.images.logo,

        ".delivery-story-image img":
            siteData.images.deliveryBanner ||
            siteData.images.delivery,

        ".about-image img":
            siteData.images.owner

    };


    Object.entries(imageMap)
        .forEach(
            ([selector, imagePath]) => {

                const image =
                    document.querySelector(
                        selector
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


    Object.entries(productImages)
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
   PART 2 END
========================================================= */
/* =========================================================
   13. PRODUCT WHATSAPP ORDERS
========================================================= */


/* ---------------------------------------------------------
   GET SELECTED PRODUCT QUANTITY
--------------------------------------------------------- */

function getSelectedProductQuantity(productName) {

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

    if (activeButton) {
        return activeButton.dataset.quantity;
    }

    const firstButton =
        container.querySelector(
            "button"
        );

    return firstButton
        ? firstButton.dataset.quantity
        : "";

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
        Number(
            milk.cowMilkPrice
        ) || 65;

    if (
        variant === "Buffalo Milk"
    ) {

        price =
            Number(
                milk.buffaloMilkPrice
            ) || 75;

    }

    priceElement.textContent =
        Number.isFinite(price) &&
        price > 0
            ? price.toLocaleString("en-IN")
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

    let price =
        1499;

    if (
        variant === "Buffalo Desi Ghee"
    ) {

        price =
            Number(
                ghee.variants?.buffalo?.price
            ) || 1299;

    }

    if (
        variant === "Cow Ghee"
    ) {

        price =
            Number(
                ghee.variants?.cow?.price
            ) || 1499;

    }

    priceElement.textContent =
        Number.isFinite(price) &&
        price > 0
            ? price.toLocaleString("en-IN")
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


/* ---------------------------------------------------------
   PRODUCT ORDER SETUP
--------------------------------------------------------- */

function setupProductOrderButtons() {

    let selectedOrder = null;


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
                            siteData.products?.[
                                productKey
                            ];

                        if (!product) {
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


                        if (
                            productKey === "milk"
                        ) {

                            variantText =
                                getSelectedMilkVariant();

                            price =
                                variantText ===
                                    "Buffalo Milk"
                                    ? Number(
                                        product.buffaloMilkPrice
                                    ) || 75
                                    : Number(
                                        product.cowMilkPrice
                                    ) || 65;

                        }


                        if (
                            productKey === "ghee"
                        ) {

                            variantText =
                                getSelectedGheeVariant();

                            price =
                                variantText ===
                                    "Buffalo Desi Ghee"
                                    ? Number(
                                        product.variants
                                            ?.buffalo
                                            ?.price
                                    ) || 1299
                                    : Number(
                                        product.variants
                                            ?.cow
                                            ?.price
                                    ) || 1499;

                        }


                        selectedOrder = {

                            productName:
                                product.name,

                            productKey:
                                productKey,

                            variant:
                                variantText,

                            quantity:
                                quantity,

                            price:
                                price

                        };


                        const modal =
                            getElement(
                                "customer-order-modal"
                            );


                        if (modal) {

                            modal.style.display =
                                "flex";

                        }

                    }
                );

            }
        );


    /* -----------------------------------------------------
       CANCEL PRODUCT ORDER
    ----------------------------------------------------- */

    const cancelButton =
        getElement(
            "cancel-order-button"
        );


    if (cancelButton) {

        cancelButton.addEventListener(
            "click",
            () => {

                const modal =
                    getElement(
                        "customer-order-modal"
                    );

                if (modal) {

                    modal.style.display =
                        "none";

                }

                selectedOrder = null;

            }
        );

    }


    /* -----------------------------------------------------
       CONFIRM PRODUCT ORDER
    ----------------------------------------------------- */

    const confirmButton =
        getElement(
            "confirm-order-button"
        );


    if (confirmButton) {

        confirmButton.addEventListener(
            "click",
            () => {

                if (!selectedOrder) {
                    return;
                }


                const customerName =
                    getElement(
                        "customer-name"
                    )?.value.trim();


                const customerMobile =
                    getElement(
                        "customer-mobile"
                    )?.value.trim();


                const customerArea =
                    getElement(
                        "customer-area"
                    )?.value.trim();


                const customerAddress =
                    getElement(
                        "customer-address"
                    )?.value.trim();


                const customerLandmark =
                    getElement(
                        "customer-landmark"
                    )?.value.trim();


                if (
                    !customerName ||
                    !customerMobile ||
                    !customerArea ||
                    !customerAddress
                ) {

                    alert(
                        "Please fill all required details."
                    );

                    return;

                }


                const priceText =
                    `₹${Number(
                        selectedOrder.price
                    ).toLocaleString("en-IN")}`;


                const message = `
Hello, I want to order from ${siteData.businessName}.

Product: ${selectedOrder.productName}

${selectedOrder.variant
    ? `Type: ${selectedOrder.variant}`
    : ""}

Quantity: ${selectedOrder.quantity || "Please confirm"}

Price: ${priceText}

Customer Name: ${customerName}
Mobile Number: ${customerMobile}
Delivery Area: ${customerArea}
Delivery Address: ${customerAddress}
${customerLandmark
    ? `Landmark: ${customerLandmark}`
    : ""}

Please confirm my order.
                `.trim();


                const url =
                    createWhatsAppUrl(
                        message
                    );


                if (url !== "#") {

                    window.open(
                        url,
                        "_blank",
                        "noopener,noreferrer"
                    );

                }


                const modal =
                    getElement(
                        "customer-order-modal"
                    );

                if (modal) {

                    modal.style.display =
                        "none";

                }

                selectedOrder = null;

            }
        );

    }

}


/* =========================================================
   PART 3 END
========================================================= */
/* =========================================================
   15. SUBSCRIPTION CALCULATOR
========================================================= */

function setupSubscription() {

    const subscriptionProduct =
        getElement(
            "subscription-product"
        );

    const dailyQuantity =
        getElement(
            "daily-quantity"
        );

    const subscriptionDays =
        getElement(
            "subscription-days"
        );

    const monthlyQuantity =
        getElement(
            "monthly-quantity"
        );

    const monthlyPrice =
        getElement(
            "monthly-price"
        );


    /* -----------------------------------------------------
       CALCULATE SUBSCRIPTION
    ----------------------------------------------------- */

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


        /* -------------------------------------------------
           PRODUCT PRICE
        ------------------------------------------------- */

        let price =
            Number(
                product.price
            );


        /* MILK PRICE */

        if (
            productKey === "milk"
        ) {

            const selectedVariant =
                getSelectedMilkVariant();

            price =
                selectedVariant ===
                    "Buffalo Milk"
                    ? Number(
                        product.buffaloMilkPrice
                    ) || 75
                    : Number(
                        product.cowMilkPrice
                    ) || 65;

        }


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


        /* -------------------------------------------------
           TOTAL QUANTITY
        ------------------------------------------------- */

        const totalQuantity =
            quantity * days;


        /* -------------------------------------------------
           TOTAL PRICE
        ------------------------------------------------- */

        const totalAmount =
            totalQuantity * price;


        /* -------------------------------------------------
           UNIT
        ------------------------------------------------- */

        let unit = "";


        if (
            productKey === "milk" ||
            productKey === "buttermilk"
        ) {

            unit = "L";

        }


        if (
            productKey === "curd"
        ) {

            unit = "Kg";

        }


        /* -------------------------------------------------
           SHOW RESULT
        ------------------------------------------------- */

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


    /* -----------------------------------------------------
       UPDATE QUANTITY OPTIONS
    ----------------------------------------------------- */

    function updateSubscriptionQuantityOptions() {

        if (
            !subscriptionProduct ||
            !dailyQuantity
        ) {

            return;

        }


        const productKey =
            subscriptionProduct.value;


        let options = [];


        if (
            productKey === "milk"
        ) {

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


        if (
            productKey === "curd"
        ) {

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


        if (
            productKey === "buttermilk"
        ) {

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


        dailyQuantity.innerHTML =
            "";


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


    /* -----------------------------------------------------
       EVENTS
    ----------------------------------------------------- */

    if (subscriptionProduct) {

        subscriptionProduct.addEventListener(
            "change",
            updateSubscriptionQuantityOptions
        );

    }


    if (dailyQuantity) {

        dailyQuantity.addEventListener(
            "change",
            calculateSubscription
        );

    }


    if (subscriptionDays) {

        subscriptionDays.addEventListener(
            "input",
            calculateSubscription
        );

    }


    /* -----------------------------------------------------
       SUBSCRIPTION WHATSAPP BUTTON
    ----------------------------------------------------- */

    const whatsappButton =
        getElement(
            "subscription-whatsapp-button"
        );


    if (whatsappButton) {

        whatsappButton.addEventListener(
            "click",
            () => {

                calculateSubscription();


                const modal =
                    getElement(
                        "subscription-customer-modal"
                    );


                if (modal) {

                    modal.style.display =
                        "flex";

                }

            }
        );

    }


    /* -----------------------------------------------------
       CANCEL SUBSCRIPTION
    ----------------------------------------------------- */

    const cancelButton =
        getElement(
            "subscription-cancel-button"
        );


    if (cancelButton) {

        cancelButton.addEventListener(
            "click",
            () => {

                const modal =
                    getElement(
                        "subscription-customer-modal"
                    );


                if (modal) {

                    modal.style.display =
                        "none";

                }

            }
        );

    }


    /* -----------------------------------------------------
       CONFIRM SUBSCRIPTION
    ----------------------------------------------------- */

    const confirmButton =
        getElement(
            "subscription-confirm-button"
        );


    if (confirmButton) {

        confirmButton.addEventListener(
            "click",
            () => {

                const customerName =
                    getElement(
                        "subscription-customer-name"
                    )?.value.trim();


                const customerMobile =
                    getElement(
                        "subscription-customer-mobile"
                    )?.value.trim();


                const customerArea =
                    getElement(
                        "subscription-customer-area"
                    )?.value.trim();


                const customerAddress =
                    getElement(
                        "subscription-customer-address"
                    )?.value.trim();


                const customerLandmark =
                    getElement(
                        "subscription-customer-landmark"
                    )?.value.trim();


                if (
                    !customerName ||
                    !customerMobile ||
                    !customerArea ||
                    !customerAddress
                ) {

                    alert(
                        "Please fill all required details."
                    );

                    return;

                }


                calculateSubscription();


                const productKey =
                    subscriptionProduct
                        ? subscriptionProduct.value
                        : "milk";


                const product =
                    siteData.products?.[
                        productKey
                    ];


                const productName =
                    product?.name ||
                    "Product";


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


                const message = `
Hello, I want to start a subscription from ${siteData.businessName}.

Product: ${productName}

Daily Quantity: ${quantity || "Please confirm"}

Number of Days: ${days}

Total Quantity: ${totalQuantity}

Estimated Amount: ${totalAmount}

Customer Name: ${customerName}
Mobile Number: ${customerMobile}
Delivery Area: ${customerArea}
Delivery Address: ${customerAddress}
${customerLandmark
    ? `Landmark: ${customerLandmark}`
    : ""}

Please confirm my subscription.
                `.trim();


                const url =
                    createWhatsAppUrl(
                        message
                    );


                if (url !== "#") {

                    window.open(
                        url,
                        "_blank",
                        "noopener,noreferrer"
                    );

                }


                const modal =
                    getElement(
                        "subscription-customer-modal"
                    );


                if (modal) {

                    modal.style.display =
                        "none";

                }

            }
        );

    }


    /* -----------------------------------------------------
       INITIAL CALCULATION
    ----------------------------------------------------- */

    updateSubscriptionQuantityOptions();

}


/* =========================================================
   PART 4 END
========================================================= */
/* =========================================================
   16. CALL BUTTON
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
   17. INSTAGRAM
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
   18. GOOGLE MAPS
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
   19. PAYMENT INFORMATION
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
   20. PAYMENT COPY BUTTON
========================================================= */

function setupPaymentCopy() {

    const copyPaymentButton =
        getElement(
            "copy-payment-button"
        );

    if (!copyPaymentButton) {
        return;
    }


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
function setupUpiCopy() {
    const copyUpiButton = getElement("copy-upi-button");

    if (!copyUpiButton) return;

    copyUpiButton.addEventListener("click", async () => {

        const upiId = siteData.upiId;

        if (!upiId || upiId === "UPI_ID") {
            alert("UPI ID is not available yet.");
            return;
        }

        try {
            await navigator.clipboard.writeText(upiId);

            const originalText = copyUpiButton.textContent;

            copyUpiButton.textContent = "Copied!";

            setTimeout(() => {
                copyUpiButton.textContent = originalText || "Copy";
            }, 1500);

        } catch (error) {
            console.error("Could not copy UPI ID:", error);
            alert(`UPI ID: ${upiId}`);
        }
    });
}
// ======================================================
// CUSTOMER PAYMENT REQUEST
// ======================================================

async function setupCustomerPaymentRequest() {
    const submitButton = getElement("submit-payment-request-button");

    if (!submitButton) return;

    submitButton.addEventListener("click", async () => {

        const customerName =
            getElement("customer-payment-name")?.value.trim();

        const mobile =
            getElement("customer-payment-mobile")?.value.trim();

        const orderId =
            getElement("customer-payment-order-id")?.value.trim();

        const productName =
            getElement("customer-payment-product")?.value.trim();

        const quantity =
            getElement("customer-payment-quantity")?.value.trim();

        const subscriptionType =
            getElement("customer-payment-type")?.value;

        const daysValue =
            getElement("customer-payment-days")?.value;

        const subscriptionDays =
            daysValue ? Number(daysValue) : null;

        const customerArea =
            getElement("customer-payment-area")?.value.trim();

        const customerAddress =
            getElement("customer-payment-address")?.value.trim();

        const customerLandmark =
            getElement("customer-payment-landmark")?.value.trim();

        const billAmount =
            Number(getElement("customer-payment-bill-amount")?.value) || 0;

        const paidAmount =
            Number(getElement("customer-payment-paid-amount")?.value) || 0;

        const paymentMethod =
            getElement("customer-payment-method")?.value;

        const transactionId =
            getElement("customer-payment-transaction-id")?.value.trim();

        const note =
            getElement("customer-payment-note")?.value.trim();


        // Basic validation
        if (!customerName || !mobile || !paidAmount) {
            alert("Please fill Customer Name, Mobile Number and Paid Amount.");
            return;
        }

        if (paymentMethod === "UPI" && !transactionId) {
            alert("For UPI payment, please enter Transaction ID / UTR.");
            return;
        }


        submitButton.disabled = true;
        submitButton.textContent = "Submitting...";


        try {

            const { error } = await supabaseClient
                .from("payment_requests")
                .insert([
                    {
                        customer_name: customerName,
                        mobile: mobile,
                        order_id: orderId,

                        product_name: productName,
                        quantity: quantity,

                        subscription_type: subscriptionType,
                        subscription_days: subscriptionDays,

                        customer_area: customerArea,
                        customer_address: customerAddress,
                        customer_landmark: customerLandmark,

                        bill_amount: billAmount,
                        paid_amount: paidAmount,
                        order_total: billAmount,

                        payment_method: paymentMethod,
                        transaction_id: transactionId,

                        note: note,

                        status: "Pending Approval"
                    }
                ]);


            if (error) {
                console.error("Payment request error:", error);
                throw error;
            }


            const messageBox =
                getElement("payment-request-message");

            if (messageBox) {
                messageBox.textContent =
                    "Payment details submitted successfully. Your payment is pending verification.";
            }


            alert(
                "Payment details submitted successfully! Your payment is now pending verification."
            );

// SEND PAYMENT DETAILS TO OWNER ON WHATSAPP

const whatsappMessage = `
💳 PAYMENT CONFIRMATION

Customer Name: ${customerName}
Mobile Number: ${mobile}

Product: ${productName || "Not provided"}
Quantity: ${quantity || "Not provided"}
Number of Days: ${subscriptionDays || "Not applicable"}

Paid Amount: ₹${paidAmount}
Payment Method: ${paymentMethod || "Not provided"}
Transaction ID / UTR: ${transactionId || "Not provided"}

Payment Status: Pending Verification

Please verify this payment.
`.trim();

const whatsappUrl =
    createWhatsAppUrl(whatsappMessage);

if (whatsappUrl !== "#") {
    window.open(
        whatsappUrl,
        "_blank",
        "noopener,noreferrer"
    );
}
            // Clear form
            document
                .querySelector(".customer-payment-form")
                ?.reset();


        } catch (error) {

            console.error("Payment request failed:", error);

            alert(
                "Payment request could not be submitted. Please try again."
            );

        } finally {

            submitButton.disabled = false;
            submitButton.textContent = "Submit Payment Details";

        }
    });
}

/* =========================================================
   21. DELIVERY AREAS
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
   22. BOTTLE INFORMATION
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
   PART 5 END
========================================================= *//* =========================================================
   23. OFFERS
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
   24. IMAGE FALLBACKS
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
   25. SMOOTH NAVIGATION
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
   26. FINAL INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        setupMobileMenu();

        loadBusinessInformation();

        loadProductData();

        loadHeroImage();

        loadLogoImage();

        loadDeliveryImage();

        loadOwnerImage();

        loadWebsiteImages();

        setupWhatsAppButtons();

        setupProductOrderButtons();

        setupMilkVariants();

        setupGheeVariants();

        loadMilkVariantPrice();

        loadGheeVariantPrice();

        setupSubscription();

        setupCallButton();

        setupInstagram();

        setupGoogleMaps();

        loadPaymentInformation();

        setupPaymentCopy();
setupCustomerPaymentRequest();
setupUpiCopy();
        loadDeliveryAreas();

        setupBottleSection();

        setupOffers();

        setupImageFallbacks();

        setupSmoothNavigation();

    }
);


/* =========================================================
   JHALAWAR ORGANIC MILK - SCRIPT COMPLETE
========================================================= */
/* =========================================================
   CUSTOMER FEEDBACK SYSTEM - SUPABASE
========================================================= */

function setupFeedback() {

    const stars =
        document.querySelectorAll(
            "#feedback-stars button"
        );

    const submitButton =
        document.getElementById(
            "submit-feedback-button"
        );

    const nameInput =
        document.getElementById(
            "feedback-name"
        );

    const messageInput =
        document.getElementById(
            "feedback-message"
        );

    const feedbackList =
        document.getElementById(
            "feedback-list"
        );

    const averageElement =
        document.getElementById(
            "feedback-average"
        );

    const countElement =
        document.getElementById(
            "feedback-count"
        );

    const filterButtons =
        document.querySelectorAll(
            ".feedback-filter-button"
        );


    if (
        !stars.length ||
        !submitButton ||
        !nameInput ||
        !messageInput ||
        !feedbackList
    ) {
        return;
    }


    let selectedRating = 0;

    let activeFilter = "all";

    let reviews = [];


    /* =====================================================
       LOAD APPROVED REVIEWS FROM SUPABASE
    ===================================================== */

    async function loadReviews() {

        const {
            data,
            error
        } = await supabaseClient
            .from("feedback")
            .select(
                "id, created_at, name, rating, message"
            )
            .eq(
                "approved",
                true
            )
            .order(
                "created_at",
                {
                    ascending: false
                }
            );


        if (error) {

            console.error(
                "Could not load feedback:",
                error
            );

            feedbackList.innerHTML = `
                <div class="feedback-empty">
                    <span>⚠️</span>
                    <h4>Reviews load nahi ho paaye</h4>
                    <p>Please thodi der baad try karein.</p>
                </div>
            `;

            return;
        }


        reviews = data || [];

        renderReviews();

    }


    /* =====================================================
       STAR SELECTION
    ===================================================== */

    stars.forEach(
        (star) => {

            star.addEventListener(
                "click",
                () => {

                    selectedRating =
                        Number(
                            star.dataset.rating
                        );


                    stars.forEach(
                        (item) => {

                            const rating =
                                Number(
                                    item.dataset.rating
                                );


                            item.classList.toggle(
                                "active",
                                rating <= selectedRating
                            );

                        }
                    );

                }
            );

        }
    );


    /* =====================================================
       SUBMIT FEEDBACK
    ===================================================== */

    submitButton.addEventListener(
        "click",
        async () => {

            const name =
                nameInput.value.trim();

            const message =
                messageInput.value.trim();


            if (!name) {

                alert(
                    "Please apna naam likhein."
                );

                nameInput.focus();

                return;

            }


            if (!selectedRating) {

                alert(
                    "Please rating select karein."
                );

                return;

            }


            if (!message) {

                alert(
                    "Please apna feedback likhein."
                );

                messageInput.focus();

                return;

            }


            submitButton.disabled =
                true;

            submitButton.textContent =
                "Submitting...";


            const {
                error
            } = await supabaseClient
                .from("feedback")
                .insert([
                    {
                        name: name,
                        rating: selectedRating,
                        message: message
                    }
                ]);


            if (error) {

                console.error(
                    "Feedback submission failed:",
                    error
                );

                alert(
                    "Feedback submit nahi ho paaya. Please dobara try karein."
                );

                submitButton.disabled =
                    false;

                submitButton.textContent =
                    "Submit Feedback";

                return;

            }


            nameInput.value =
                "";

            messageInput.value =
                "";

            selectedRating =
                0;


            stars.forEach(
                (star) => {

                    star.classList.remove(
                        "active"
                    );

                }
            );


            submitButton.disabled =
                false;

            submitButton.textContent =
                "Submit Feedback";


            alert(
                "Thank you! Aapka feedback submit ho gaya. ❤️\n\nAdmin approval ke baad review website par dikhega."
            );


            activeFilter =
                "all";


            filterButtons.forEach(
                (button) => {

                    button.classList.toggle(
                        "active",
                        button.dataset.filter === "all"
                    );

                }
            );


            await loadReviews();

        }
    );


    /* =====================================================
       FILTER
    ===================================================== */

    filterButtons.forEach(
        (button) => {

            button.addEventListener(
                "click",
                () => {

                    activeFilter =
                        button.dataset.filter;


                    filterButtons.forEach(
                        (item) => {

                            item.classList.toggle(
                                "active",
                                item === button
                            );

                        }
                    );


                    renderReviews();

                }
            );

        }
    );


    /* =====================================================
       RENDER REVIEWS
    ===================================================== */

    function renderReviews() {

        let filteredReviews =
            reviews;


        if (
            activeFilter !== "all"
        ) {

            filteredReviews =
                reviews.filter(
                    (review) =>
                        Number(
                            review.rating
                        ) ===
                        Number(
                            activeFilter
                        )
                );

        }


        if (
            !filteredReviews.length
        ) {

            feedbackList.innerHTML = `
                <div class="feedback-empty">

                    <span>⭐</span>

                    <h4>
                        Abhi tak koi approved review nahi hai
                    </h4>

                    <p>
                        Sabse pehla feedback aap de sakte hain.
                    </p>

                </div>
            `;

        } else {

            feedbackList.innerHTML =
                filteredReviews
                    .map(
                        (review) => {

                            const rating =
                                Number(
                                    review.rating
                                );


                            const starsHTML =
                                "★".repeat(
                                    rating
                                ) +
                                "☆".repeat(
                                    5 - rating
                                );


                            return `
                                <div class="feedback-card">

                                    <div class="feedback-card-top">

                                        <div class="feedback-card-name">
                                            ${escapeHTML(
                                                review.name
                                            )}
                                        </div>

                                        <div class="feedback-card-stars">
                                            ${starsHTML}
                                        </div>

                                    </div>

                                    <p>
                                        ${escapeHTML(
                                            review.message
                                        )}
                                    </p>

                                </div>
                            `;

                        }
                    )
                    .join("");

        }


        updateSummary();

    }


    /* =====================================================
       RATING SUMMARY
    ===================================================== */

    function updateSummary() {

        const count =
            reviews.length;


        if (!count) {

            if (averageElement) {
                averageElement.textContent =
                    "0.0 ⭐";
            }

            if (countElement) {
                countElement.textContent =
                    "0 Reviews";
            }

            return;

        }


        const total =
            reviews.reduce(
                (sum, review) =>
                    sum +
                    Number(
                        review.rating
                    ),
                0
            );


        const average =
            (
                total /
                count
            ).toFixed(1);


        if (averageElement) {

            averageElement.textContent =
                `${average} ⭐`;

        }


        if (countElement) {

            countElement.textContent =
                `${count} ${
                    count === 1
                        ? "Review"
                        : "Reviews"
                }`;

        }

    }


    /* =====================================================
       SECURITY
    ===================================================== */

    function escapeHTML(text) {

        const div =
            document.createElement(
                "div"
            );

        div.textContent =
            text;

        return div.innerHTML;

    }


    /* =====================================================
       INITIAL LOAD
    ===================================================== */

    loadReviews();

}


setupFeedback();