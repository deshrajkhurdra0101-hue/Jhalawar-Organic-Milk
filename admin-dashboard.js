/* =========================================================
   JHALAWAR PURE & FRESH ORGANIC MILK
   FINAL ADMIN DASHBOARD JAVASCRIPT
========================================================= */


/* =========================================================
   1. LOGIN PROTECTION
========================================================= */

if (
    sessionStorage.getItem("adminLoggedIn") !== "true"
) {
    window.location.replace("admin.html");
}


/* =========================================================
   2. DEFAULT CONFIG
========================================================= */

function getDefaultConfig() {

    if (
        typeof businessConfig === "undefined"
    ) {

        console.error(
            "config.js is not loaded."
        );

        return {};

    }

    return JSON.parse(
        JSON.stringify(
            businessConfig
        )
    );

}


/* =========================================================
   3. DEEP MERGE
========================================================= */

function mergeData(
    defaultData,
    savedData
) {

    const result = {
        ...defaultData
    };


    if (
        !savedData ||
        typeof savedData !== "object"
    ) {

        return result;

    }


    Object.keys(savedData)
        .forEach(
            (key) => {

                const defaultValue =
                    defaultData[key];

                const savedValue =
                    savedData[key];


                if (
                    defaultValue &&
                    savedValue &&
                    typeof defaultValue === "object" &&
                    typeof savedValue === "object" &&
                    !Array.isArray(defaultValue) &&
                    !Array.isArray(savedValue)
                ) {

                    result[key] =
                        mergeData(
                            defaultValue,
                            savedValue
                        );

                } else {

                    result[key] =
                        savedValue;

                }

            }
        );


    return result;

}


/* =========================================================
   4. GET SAVED DATA
========================================================= */

function getSavedData() {

    const saved =
        localStorage.getItem(
            "jhalawarWebsiteData"
        );


    if (!saved) {

        return getDefaultConfig();

    }


    try {

        return mergeData(
            getDefaultConfig(),
            JSON.parse(saved)
        );

    } catch (error) {

        console.error(
            "Invalid saved website data:",
            error
        );

        return getDefaultConfig();

    }

}


/* =========================================================
   5. SAVE DATA
========================================================= */

function saveData(
    data
) {

    localStorage.setItem(
        "jhalawarWebsiteData",
        JSON.stringify(data)
    );

}


/* =========================================================
   6. HELPER FUNCTIONS
========================================================= */

function getElement(
    id
) {

    return document.getElementById(
        id
    );

}


function getValue(
    id,
    fallback = ""
) {

    const element =
        getElement(id);


    if (!element) {

        return fallback;

    }


    return element.value;

}


function setValue(
    id,
    value
) {

    const element =
        getElement(id);


    if (
        element &&
        value !== undefined &&
        value !== null
    ) {

        element.value =
            value;

    }

}


function getNumber(
    id,
    fallback = 0
) {

    const value =
        Number(
            getValue(
                id,
                fallback
            )
        );


    return Number.isFinite(value)
        ? value
        : fallback;

}


function parseQuantities(
    text
) {

    return String(
        text || ""
    )
        .split(",")
        .map(
            (item) =>
                item.trim()
        )
        .filter(Boolean);

}


/* =========================================================
   7. TOAST MESSAGE
========================================================= */

function showMessage(
    message,
    type = "success"
) {

    const oldToast =
        document.querySelector(
            ".admin-toast"
        );


    if (oldToast) {

        oldToast.remove();

    }


    const toast =
        document.createElement(
            "div"
        );


    toast.className =
        "admin-toast";


    toast.textContent =
        message;


    if (
        type === "error"
    ) {

        toast.style.background =
            "#b3261e";

    }


    document.body.appendChild(
        toast
    );


    setTimeout(
        () => {

            toast.classList.add(
                "hide"
            );


            setTimeout(
                () => {

                    toast.remove();

                },
                300
            );

        },
        2200
    );

}


/* =========================================================
   8. LOGOUT
========================================================= */

function setupLogout() {

    const logoutButton =
        getElement(
            "logout-button"
        );


    if (!logoutButton) {

        return;

    }


    logoutButton.addEventListener(
        "click",
        () => {

            const confirmLogout =
                confirm(
                    "Are you sure you want to logout?"
                );


            if (!confirmLogout) {

                return;

            }


            sessionStorage.removeItem(
                "adminLoggedIn"
            );


            window.location.replace(
                "admin.html"
            );

        }
    );

}


/* =========================================================
   9. BUSINESS DETAILS
========================================================= */

function loadBusinessDetails() {

    const data =
        getSavedData();


    setValue(
        "business-name",
        data.businessName
    );


    setValue(
        "brand-name",
        data.brandName
    );


    setValue(
        "owner-name",
        data.ownerName
    );


    setValue(
        "phone-number",
        data.phoneNumber
    );


    setValue(
        "whatsapp-number",
        data.whatsappNumber
    );


    setValue(
        "instagram-url",
        data.instagramUrl
    );


    setValue(
        "shop-address",
        data.shopAddress
    );


    setValue(
        "google-maps",
        data.googleMapsLink
    );

}


/* =========================================================
   10. SAVE BUSINESS DETAILS
========================================================= */

function setupBusinessDetails() {

    const button =
        getElement(
            "save-business"
        );


    if (!button) {

        return;

    }


    button.addEventListener(
        "click",
        () => {

            const data =
                getSavedData();


            const businessName =
                getValue(
                    "business-name"
                ).trim();


            const brandName =
                getValue(
                    "brand-name"
                ).trim();


            const ownerName =
                getValue(
                    "owner-name"
                ).trim();


            const phoneNumber =
                getValue(
                    "phone-number"
                ).trim();


            const whatsappNumber =
                getValue(
                    "whatsapp-number"
                ).trim();


            const instagramUrl =
                getValue(
                    "instagram-url"
                ).trim();


            const shopAddress =
                getValue(
                    "shop-address"
                ).trim();


            const googleMaps =
                getValue(
                    "google-maps"
                ).trim();


            if (businessName) {

                data.businessName =
                    businessName;

            }


            if (brandName) {

                data.brandName =
                    brandName;

            }


            if (ownerName) {

                data.ownerName =
                    ownerName;

            }


            if (phoneNumber) {

                data.phoneNumber =
                    phoneNumber;

            }


            if (whatsappNumber) {

                data.whatsappNumber =
                    whatsappNumber;

            }


            if (instagramUrl) {

                data.instagramUrl =
                    instagramUrl;

            }


            if (shopAddress) {

                data.shopAddress =
                    shopAddress;

            }


            if (googleMaps) {

                data.googleMapsLink =
                    googleMaps;

            }


            saveData(
                data
            );


            showMessage(
                "Business details saved successfully."
            );

        }
    );

}
/* =========================================================
   11. PRODUCT ADMIN HELPERS
========================================================= */

function createNumberField(
    label,
    id,
    placeholder = ""
) {

    const group =
        document.createElement(
            "div"
        );

    group.className =
        "form-group";

    group.innerHTML = `
        <label for="${id}">
            ${label}
        </label>

        <input
            id="${id}"
            type="number"
            min="0"
            step="0.01"
            placeholder="${placeholder}"
        >
    `;

    return group;
}


/* =========================================================
   12. ADD MISSING PRODUCT FIELDS
========================================================= */

function addMissingProductFields() {

    const grid =
        document.querySelector(
            ".product-admin-grid"
        );


    if (!grid) {

        return;

    }


    /* =====================================================
       MILK — COW + BUFFALO PRICE
    ===================================================== */

    const milkCard =
        [...grid.querySelectorAll(
            ".admin-product-card"
        )]
        .find(
            (card) =>
                card.querySelector("h3")
                    ?.textContent
                    .toLowerCase()
                    .includes("milk")
        );


    if (
        milkCard &&
        !getElement(
            "cow-milk-price"
        )
    ) {

        const quantityGroup =
            getElement(
                "milk-quantities"
            )?.closest(
                ".form-group"
            );


        const cowField =
            createNumberField(
                "Cow Milk Price (₹ / L)",
                "cow-milk-price",
                "65"
            );


        const buffaloField =
            createNumberField(
                "Buffalo Milk Price (₹ / L)",
                "buffalo-milk-price",
                "75"
            );


        if (quantityGroup) {

            milkCard.insertBefore(
                cowField,
                quantityGroup
            );


            milkCard.insertBefore(
                buffaloField,
                quantityGroup
            );

        } else {

            milkCard.appendChild(
                cowField
            );


            milkCard.appendChild(
                buffaloField
            );

        }

    }


    /* =====================================================
       GHEE CARD
    ===================================================== */

    let gheeCard =
        grid.querySelector(
            '[data-product="ghee"]'
        );


    if (!gheeCard) {

        gheeCard =
            document.createElement(
                "article"
            );

        gheeCard.className =
            "admin-product-card";

        gheeCard.dataset.product =
            "ghee";


        gheeCard.innerHTML = `

            <div class="product-admin-header">

                <span>
                    🧈
                </span>

                <div>

                    <h3>
                        Pure Desi Ghee
                    </h3>

                    <p>
                        Cow Ghee & Buffalo Ghee
                    </p>

                </div>

            </div>


            <div class="form-group">

                <label for="ghee-cow-price">
                    Cow Ghee Price (₹ / Kg)
                </label>

                <input
                    id="ghee-cow-price"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="1499"
                >

            </div>


            <div class="form-group">

                <label for="ghee-buffalo-price">
                    Buffalo Ghee Price (₹ / Kg)
                </label>

                <input
                    id="ghee-buffalo-price"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="1299"
                >

            </div>


            <div class="form-group">

                <label for="ghee-quantities">
                    Quantities
                </label>

                <input
                    id="ghee-quantities"
                    type="text"
                    value="250 g, 500 g, 1 Kg"
                >

            </div>


            <button
                type="button"
                class="save-button"
                data-product-save="ghee"
            >
                Save Ghee
            </button>

        `;


        grid.appendChild(
            gheeCard
        );

    }


    /* =====================================================
       MAWA CARD
    ===================================================== */

    let mawaCard =
        grid.querySelector(
            '[data-product="mawa"]'
        );


    if (!mawaCard) {

        mawaCard =
            document.createElement(
                "article"
            );

        mawaCard.className =
            "admin-product-card";

        mawaCard.dataset.product =
            "mawa";


        mawaCard.innerHTML = `

            <div class="product-admin-header">

                <span>
                    🥛
                </span>

                <div>

                    <h3>
                        Fresh Mawa
                    </h3>

                    <p>
                        Fresh dairy product
                    </p>

                </div>

            </div>


            <div class="form-group">

                <label for="mawa-price">
                    Price (₹ / Kg)
                </label>

                <input
                    id="mawa-price"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="450"
                >

            </div>


            <div class="form-group">

                <label for="mawa-quantities">
                    Quantities
                </label>

                <input
                    id="mawa-quantities"
                    type="text"
                    value="250 g, 500 g, 1 Kg"
                >

            </div>


            <button
                type="button"
                class="save-button"
                data-product-save="mawa"
            >
                Save Mawa
            </button>

        `;


        grid.appendChild(
            mawaCard
        );

    }

}


/* =========================================================
   13. LOAD PRODUCT DETAILS
========================================================= */

function loadProductDetails() {

    const data =
        getSavedData();


    const products =
        data.products || {};


    const milk =
        products.milk || {};


    const curd =
        products.curd || {};


    const buttermilk =
        products.buttermilk || {};


    const ghee =
        products.ghee || {};


    const mawa =
        products.mawa || {};


    /* =====================================================
       MILK
    ===================================================== */

    setValue(
        "milk-price",
        milk.price
    );


    setValue(
        "cow-milk-price",
        milk.cowMilkPrice ??
        milk.price
    );


    setValue(
        "buffalo-milk-price",
        milk.buffaloMilkPrice
    );


    setValue(
        "milk-quantities",
        Array.isArray(
            milk.quantities
        )
            ? milk.quantities.join(", ")
            : ""
    );


    /* =====================================================
       CURD
    ===================================================== */

    setValue(
        "curd-price",
        curd.price
    );


    setValue(
        "curd-quantities",
        Array.isArray(
            curd.quantities
        )
            ? curd.quantities.join(", ")
            : ""
    );


    /* =====================================================
       BUTTERMILK
    ===================================================== */

    setValue(
        "buttermilk-price",
        buttermilk.price
    );


    setValue(
        "buttermilk-quantities",
        Array.isArray(
            buttermilk.quantities
        )
            ? buttermilk.quantities.join(", ")
            : ""
    );


    /* =====================================================
       GHEE
    ===================================================== */

    setValue(
        "ghee-cow-price",
        ghee.variants
            ?.cow
            ?.price
    );


    setValue(
        "ghee-buffalo-price",
        ghee.variants
            ?.buffalo
            ?.price
    );


    setValue(
        "ghee-quantities",
        Array.isArray(
            ghee.quantities
        )
            ? ghee.quantities.join(", ")
            : ""
    );


    /* =====================================================
       MAWA
    ===================================================== */

    setValue(
        "mawa-price",
        mawa.price
    );


    setValue(
        "mawa-quantities",
        Array.isArray(
            mawa.quantities
        )
            ? mawa.quantities.join(", ")
            : ""
    );

}


/* =========================================================
   14. SAVE PRODUCT
========================================================= */

function saveProduct(
    productKey
) {

    const data =
        getSavedData();


    if (!data.products) {

        data.products = {};

    }


    if (!data.products[productKey]) {

        data.products[productKey] = {};

    }


    const product =
        data.products[
            productKey
        ];


    /* =====================================================
       MILK
    ===================================================== */

    if (
        productKey ===
        "milk"
    ) {

        const cowPrice =
            getNumber(
                "cow-milk-price",
                65
            );


        const buffaloPrice =
            getNumber(
                "buffalo-milk-price",
                75
            );


        const quantityList =
            parseQuantities(
                getValue(
                    "milk-quantities"
                )
            );


        product.name =
            "Fresh Milk";


        product.price =
            cowPrice;


        product.cowMilkPrice =
            cowPrice;


        product.buffaloMilkPrice =
            buffaloPrice;


        product.unit =
            "litre";


        product.quantities =
            quantityList.length
                ? quantityList
                : [
                    "500 ml",
                    "1 Litre",
                    "2 Litres"
                ];


        product.variants = [
            "Cow Milk",
            "Buffalo Milk"
        ];


        product.image =
            "images/milk.jpg";

    }


    /* =====================================================
       CURD
    ===================================================== */

    if (
        productKey ===
        "curd"
    ) {

        const price =
            getNumber(
                "curd-price",
                120
            );


        const quantityList =
            parseQuantities(
                getValue(
                    "curd-quantities"
                )
            );


        product.name =
            "Fresh Dahi";


        product.price =
            price;


        product.unit =
            "Kg";


        product.quantities =
            quantityList.length
                ? quantityList
                : [
                    "250 g",
                    "500 g",
                    "1 Kg"
                ];


        product.image =
            "images/curd.jpg";

    }


    /* =====================================================
       BUTTERMILK
    ===================================================== */

    if (
        productKey ===
        "buttermilk"
    ) {

        const price =
            getNumber(
                "buttermilk-price",
                30
            );


        const quantityList =
            parseQuantities(
                getValue(
                    "buttermilk-quantities"
                )
            );


        product.name =
            "Fresh Chhach";


        product.price =
            price;


        product.unit =
            "litre";


        product.quantities =
            quantityList.length
                ? quantityList
                : [
                    "250 ml",
                    "500 ml",
                    "1 Litre"
                ];


        product.image =
            "images/buttermilk.jpg";

    }


    /* =====================================================
       GHEE
    ===================================================== */

    if (
        productKey ===
        "ghee"
    ) {

        const cowPrice =
            getNumber(
                "ghee-cow-price",
                1499
            );


        const buffaloPrice =
            getNumber(
                "ghee-buffalo-price",
                1299
            );


        const quantityList =
            parseQuantities(
                getValue(
                    "ghee-quantities"
                )
            );


        product.name =
            "Pure Desi Ghee";


        product.price =
            cowPrice;


        product.unit =
            "Kg";


        product.quantities =
            quantityList.length
                ? quantityList
                : [
                    "250 g",
                    "500 g",
                    "1 Kg"
                ];


        product.variants = {

            cow: {

                name:
                    "Cow Ghee",

                price:
                    cowPrice,

                unit:
                    "1 Kg"

            },


            buffalo: {

                name:
                    "Buffalo Ghee",

                price:
                    buffaloPrice,

                unit:
                    "1 Kg"

            }

        };


        product.image =
            "images/ghee.jpg";

    }


    /* =====================================================
       MAWA
    ===================================================== */

    if (
        productKey ===
        "mawa"
    ) {

        const price =
            getNumber(
                "mawa-price",
                450
            );


        const quantityList =
            parseQuantities(
                getValue(
                    "mawa-quantities"
                )
            );


        product.name =
            "Fresh Mawa";


        product.price =
            price;


        product.unit =
            "Kg";


        product.quantities =
            quantityList.length
                ? quantityList
                : [
                    "250 g",
                    "500 g",
                    "1 Kg"
                ];


        product.image =
            "images/mawa.jpg";

    }


    saveData(
        data
    );


    showMessage(
        `${product.name || productKey} saved successfully.`
    );

}


/* =========================================================
   15. PRODUCT SAVE BUTTONS
========================================================= */

function setupProductButtons() {

    document
        .querySelectorAll(
            ".admin-product-card .save-button"
        )
        .forEach(
            (button) => {

                if (
                    button.dataset.bound ===
                    "true"
                ) {

                    return;

                }


                button.dataset.bound =
                    "true";


                button.addEventListener(
                    "click",
                    () => {

                        const explicitProduct =
                            button.dataset.productSave;


                        if (
                            explicitProduct
                        ) {

                            saveProduct(
                                explicitProduct
                            );

                            return;

                        }


                        const card =
                            button.closest(
                                ".admin-product-card"
                            );


                        const title =
                            card
                                ?.querySelector(
                                    "h3"
                                )
                                ?.textContent
                                .trim()
                                .toLowerCase() ||
                            "";


                        if (
                            title.includes(
                                "milk"
                            )
                        ) {

                            saveProduct(
                                "milk"
                            );

                            return;

                        }


                        if (
                            title.includes(
                                "curd"
                            ) ||
                            title.includes(
                                "dahi"
                            )
                        ) {

                            saveProduct(
                                "curd"
                            );

                            return;

                        }


                        if (
                            title.includes(
                                "buttermilk"
                            )
                        ) {

                            saveProduct(
                                "buttermilk"
                            );

                            return;

                        }


                        if (
                            title.includes(
                                "ghee"
                            )
                        ) {

                            saveProduct(
                                "ghee"
                            );

                            return;

                        }


                        if (
                            title.includes(
                                "mawa"
                            )
                        ) {

                            saveProduct(
                                "mawa"
                            );

                        }

                    }
                );

            }
        );

}


/* =========================================================
   END OF PART 2
========================================================= */

/* =========================================================
   16. DELIVERY SETTINGS
========================================================= */

function loadDeliveryDetails() {

    const data =
        getSavedData();


    setValue(
        "delivery-start",
        data.deliveryStartInput ||
        "06:00"
    );


    setValue(
        "delivery-end",
        data.deliveryEndInput ||
        "12:00"
    );


    setValue(
        "delivery-charge",
        data.deliveryCharge ??
        0
    );


    const areas =
        getElement(
            "delivery-areas"
        );


    if (
        areas &&
        Array.isArray(
            data.deliveryAreas
        )
    ) {

        areas.value =
            data.deliveryAreas.join(
                "\n"
            );

    }

}


/* =========================================================
   SAVE DELIVERY
========================================================= */

function setupDelivery() {

    const section =
        getElement(
            "delivery"
        );


    if (!section) {

        return;

    }


    const button =
        section.querySelector(
            ".save-button"
        );


    if (!button) {

        return;

    }


    button.addEventListener(
        "click",
        () => {

            const data =
                getSavedData();


            const start =
                getValue(
                    "delivery-start"
                );


            const end =
                getValue(
                    "delivery-end"
                );


            const charge =
                getNumber(
                    "delivery-charge",
                    0
                );


            const areasText =
                getValue(
                    "delivery-areas"
                );


            data.deliveryStartInput =
                start;


            data.deliveryEndInput =
                end;


            data.deliveryStartTime =
                formatTime(
                    start
                );


            data.deliveryEndTime =
                formatTime(
                    end
                );


            data.deliveryCharge =
                charge;


            data.deliveryAreas =
                areasText
                    .split("\n")
                    .map(
                        (area) =>
                            area.trim()
                    )
                    .filter(Boolean);


            saveData(
                data
            );


            showMessage(
                "Delivery settings saved successfully."
            );

        }
    );

}


/* =========================================================
   TIME FORMAT
========================================================= */

function formatTime(
    time
) {

    if (!time) {

        return "";

    }


    const parts =
        time.split(":");


    if (
        parts.length < 2
    ) {

        return time;

    }


    let hour =
        Number(
            parts[0]
        );


    const minute =
        parts[1];


    const suffix =
        hour >= 12
            ? "PM"
            : "AM";


    hour =
        hour % 12 || 12;


    return (
        `${hour}:${minute} ${suffix}`
    );

}


/* =========================================================
   17. SUBSCRIPTION
========================================================= */

function loadSubscriptionDetails() {

    const data =
        getSavedData();


    const subscription =
        data.subscription ||
        {};


    const enabled =
        getElement(
            "subscription-enabled"
        );


    const days =
        getElement(
            "subscription-days"
        );


    if (enabled) {

        enabled.checked =
            subscription.enabled !==
            false;

    }


    if (days) {

        days.value =
            subscription.defaultDays ||
            30;

    }

}


/* =========================================================
   SAVE SUBSCRIPTION
========================================================= */

function setupSubscription() {

    const button =
        document.querySelector(
            "#subscription .save-button"
        );


    if (!button) {

        return;

    }


    button.addEventListener(
        "click",
        () => {

            const data =
                getSavedData();


            if (
                !data.subscription
            ) {

                data.subscription =
                    {};

            }


            const enabled =
                getElement(
                    "subscription-enabled"
                );


            const days =
                getElement(
                    "subscription-days"
                );


            data.subscription.enabled =
                enabled
                    ? enabled.checked
                    : true;


            if (
                days &&
                days.value
            ) {

                data.subscription.defaultDays =
                    Number(
                        days.value
                    );

            }


            data.subscription.product =
                "milk";


            data.subscription.quantityOptions =
                [
                    0.5,
                    1,
                    2
                ];


            saveData(
                data
            );


            showMessage(
                "Subscription settings saved successfully."
            );

        }
    );

}


/* =========================================================
   18. PAYMENT
========================================================= */

function loadPaymentDetails() {

    const data =
        getSavedData();


    setValue(
        "payment-number",
        data.paymentNumber ||
        ""
    );


    setValue(
        "upi-id",
        data.upiId ||
        ""
    );

}


/* =========================================================
   SAVE PAYMENT
========================================================= */

function setupPayment() {

    const button =
        document.querySelector(
            "#payment .save-button"
        );


    if (!button) {

        return;

    }


    button.addEventListener(
        "click",
        () => {

            const data =
                getSavedData();


            const paymentNumber =
                getValue(
                    "payment-number"
                ).trim();


            const upiId =
                getValue(
                    "upi-id"
                ).trim();


            data.paymentNumber =
                paymentNumber;


            data.upiId =
                upiId;


            saveData(
                data
            );


            showMessage(
                "Payment details saved successfully."
            );

        }
    );

}


/* =========================================================
   19. OFFERS
========================================================= */

function loadOffers() {

    const data =
        getSavedData();


    const referral =
        getElement(
            "referral-offer"
        );


    const trial =
        getElement(
            "trial-offer"
        );


    if (
        referral &&
        data.offers?.referral
            ?.description
    ) {

        referral.value =
            data.offers
                .referral
                .description;

    }


    if (
        trial &&
        data.offers?.trial
            ?.description
    ) {

        trial.value =
            data.offers
                .trial
                .description;

    }

}


/* =========================================================
   SAVE OFFERS
========================================================= */

function setupOffers() {

    const cards =
        document.querySelectorAll(
            ".offers-admin-grid .admin-card"
        );


    cards.forEach(
        (card, index) => {

            const button =
                card.querySelector(
                    ".save-button"
                );


            const textarea =
                card.querySelector(
                    "textarea"
                );


            if (
                !button ||
                !textarea
            ) {

                return;

            }


            button.addEventListener(
                "click",
                () => {

                    const data =
                        getSavedData();


                    if (!data.offers) {

                        data.offers =
                            {};

                    }


                    if (
                        index === 0
                    ) {

                        data.offers.referral =
                            {

                                enabled:
                                    true,

                                title:
                                    "New Customer Referral",

                                description:
                                    textarea
                                        .value
                                        .trim()

                            };

                    }


                    if (
                        index === 1
                    ) {

                        data.offers.trial =
                            {

                                enabled:
                                    true,

                                title:
                                    "Free Trial Sample",

                                description:
                                    textarea
                                        .value
                                        .trim()

                            };

                    }


                    saveData(
                        data
                    );


                    showMessage(
                        "Offer saved successfully."
                    );

                }
            );

        }
    );

}


/* =========================================================
   20. SEO SETTINGS
========================================================= */

function loadSEO() {

    const data =
        getSavedData();


    setValue(
        "seo-title",
        data.seo?.title ||
        "Jhalawar Pure & Fresh Organic Milk"
    );


    setValue(
        "seo-description",
        data.seo?.description ||
        "Fresh milk, curd and buttermilk delivered to your doorstep every morning in Jhalawar."
    );

}


/* =========================================================
   SAVE SEO
========================================================= */

function setupSEO() {

    const button =
        document.querySelector(
            "#seo .save-button"
        );


    if (!button) {

        return;

    }


    button.addEventListener(
        "click",
        () => {

            const data =
                getSavedData();


            data.seo = {

                title:
                    getValue(
                        "seo-title"
                    ).trim() ||
                    "Jhalawar Pure & Fresh Organic Milk",


                description:
                    getValue(
                        "seo-description"
                    ).trim() ||
                    "Fresh milk, curd and buttermilk delivered to your doorstep every morning in Jhalawar."

            };


            saveData(
                data
            );


            showMessage(
                "SEO settings saved successfully."
            );

        }
    );

}


/* =========================================================
   END OF PART 3
========================================================= */
/* =========================================================
   21. IMAGE MANAGEMENT
========================================================= */

const IMAGE_DEFINITIONS = {

    logo: {
        title: "Logo",
        defaultPath: "images/logo.png"
    },

    hero: {
        title: "Hero Image",
        defaultPath: "images/hero.jpg"
    },

    milk: {
        title: "Milk Image",
        defaultPath: "images/milk.jpg"
    },

    curd: {
        title: "Curd Image",
        defaultPath: "images/curd.jpg"
    },

    buttermilk: {
        title: "Buttermilk / Chhach Image",
        defaultPath: "images/buttermilk.jpg"
    },

    ghee: {
        title: "Ghee Image",
        defaultPath: "images/ghee.jpg"
    },

    bottle: {
        title: "Bottle Image",
        defaultPath: "images/bottle.jpg"
    },

    brandBanner: {
        title: "Brand Banner",
        defaultPath: "images/brand-banner.jpg"
    },

    deliveryBanner: {
        title: "Delivery Banner",
        defaultPath: "images/delivery-banner.jpg"
    },

    brandBanner2: {
        title: "Second Brand Banner",
        defaultPath: "images/brand-banner-2.jpg"
    },

    owner: {
        title: "Owner Image",
        defaultPath: "images/owner.jpg"
    },

    mawa: {
        title: "Mawa Image",
        defaultPath: "images/mawa.jpg"
    }

};


/* =========================================================
   CREATE MISSING IMAGE CARDS
========================================================= */

function ensureImageAdminCards() {

    const grid =
        document.querySelector(
            ".image-admin-grid"
        );


    if (!grid) {
        return;
    }


    Object.entries(
        IMAGE_DEFINITIONS
    ).forEach(
        ([key, info]) => {

            let card =
                grid.querySelector(
                    `[data-image-key="${key}"]`
                );


            if (!card) {

                card =
                    document.createElement(
                        "div"
                    );

                card.className =
                    "image-upload-card";

                card.dataset.imageKey =
                    key;


                card.innerHTML = `

                    <div
                        class="image-preview"
                        data-image-preview="${key}"
                    >
                        ${info.title}
                    </div>

                    <h3>
                        ${info.title}
                    </h3>

                    <input
                        type="file"
                        accept="image/*"
                        data-image-input="${key}"
                    >

                `;


                grid.appendChild(
                    card
                );

            }


            const input =
                card.querySelector(
                    'input[type="file"]'
                );


            const preview =
                card.querySelector(
                    ".image-preview"
                );


            if (input) {

                input.dataset.imageInput =
                    key;

            }


            if (preview) {

                preview.dataset.imagePreview =
                    key;

            }

        }
    );

}


/* =========================================================
   READ IMAGE
========================================================= */

function readImageFile(
    file
) {

    return new Promise(
        (resolve, reject) => {

            const reader =
                new FileReader();


            reader.onload =
                () => {

                    resolve(
                        reader.result
                    );

                };


            reader.onerror =
                () => {

                    reject(
                        new Error(
                            "Could not read image."
                        )
                    );

                };


            reader.readAsDataURL(
                file
            );

        }
    );

}


/* =========================================================
   SHOW IMAGE PREVIEW
========================================================= */

function showImagePreview(
    key,
    source
) {

    const preview =
        document.querySelector(
            `[data-image-preview="${key}"]`
        );


    if (
        !preview ||
        !source
    ) {

        return;

    }


    preview.innerHTML =
        "";


    const image =
        document.createElement(
            "img"
        );


    image.src =
        source;


    image.alt =
        IMAGE_DEFINITIONS[key]
            ?.title ||
        key;


    image.style.width =
        "100%";


    image.style.height =
        "100%";


    image.style.objectFit =
        "cover";


    image.style.borderRadius =
        "inherit";


    preview.appendChild(
        image
    );

}


/* =========================================================
   LOAD SAVED IMAGE PREVIEWS
========================================================= */

function loadSavedImagePreviews() {

    const data =
        getSavedData();


    const images =
        data.images ||
        {};


    Object.keys(
        IMAGE_DEFINITIONS
    )
    .forEach(
        (key) => {

            const source =
                images[key];


            if (
                typeof source ===
                    "string" &&
                source.startsWith(
                    "data:image/"
                )
            ) {

                showImagePreview(
                    key,
                    source
                );

            }

        }
    );

}


/* =========================================================
   IMAGE UPLOAD
========================================================= */

function setupImageUploads() {

    const inputs =
        document.querySelectorAll(
            'input[data-image-input]'
        );


    inputs.forEach(
        (input) => {

            if (
                input.dataset.bound ===
                "true"
            ) {

                return;

            }


            input.dataset.bound =
                "true";


            input.addEventListener(
                "change",
                async () => {

                    const file =
                        input.files?.[0];


                    const key =
                        input.dataset.imageInput;


                    if (!file || !key) {

                        return;

                    }


                    if (
                        !file.type.startsWith(
                            "image/"
                        )
                    ) {

                        showMessage(
                            "Please select a valid image.",
                            "error"
                        );

                        input.value =
                            "";

                        return;

                    }


                    /*
                       Keep localStorage safe.
                       Maximum 2 MB.
                    */

                    if (
                        file.size >
                        2 * 1024 * 1024
                    ) {

                        showMessage(
                            "Please use an image smaller than 2 MB.",
                            "error"
                        );

                        input.value =
                            "";

                        return;

                    }


                    try {

                        const imageData =
                            await readImageFile(
                                file
                            );


                        const data =
                            getSavedData();


                        if (!data.images) {

                            data.images =
                                {};

                        }


                        data.images[key] =
                            imageData;


                        saveData(
                            data
                        );


                        showImagePreview(
                            key,
                            imageData
                        );


                        showMessage(
                            `${IMAGE_DEFINITIONS[key]?.title || "Image"} saved successfully.`
                        );


                    } catch (error) {

                        console.error(
                            error
                        );


                        showMessage(
                            "Could not save image.",
                            "error"
                        );

                    }


                    input.value =
                        "";

                }
            );

        }
    );


    loadSavedImagePreviews();

}


/* =========================================================
   22. DASHBOARD STATUS
========================================================= */

function refreshDashboardStatus() {

    const data =
        getSavedData();


    const cards =
        document.querySelectorAll(
            ".status-card"
        );


    cards.forEach(
        (card) => {

            const heading =
                card.querySelector(
                    "strong"
                )
                ?.textContent
                ?.trim()
                ?.toLowerCase();


            const value =
                card.querySelector(
                    "span:last-child"
                );


            if (!value) {

                return;

            }


            /* PRODUCTS */

            if (
                heading ===
                "products"
            ) {

                const productNames =
                    Object.values(
                        data.products ||
                        {}
                    )
                    .map(
                        (product) =>
                            product?.name
                    )
                    .filter(Boolean);


                if (
                    productNames.length
                ) {

                    value.textContent =
                        productNames.join(
                            ", "
                        );

                }

            }


            /* DELIVERY */

            if (
                heading ===
                "delivery"
            ) {

                value.textContent =
                    `${data.deliveryStartTime || "6:00 AM"} – ${data.deliveryEndTime || "12:00 PM"}`;

            }


            /* WHATSAPP */

            if (
                heading ===
                "whatsapp"
            ) {

                value.textContent =
                    data.whatsappNumber ||
                    "Not set";

            }


            /* DELIVERY CHARGE */

            if (
                heading ===
                "delivery charge"
            ) {

                value.textContent =
                    Number(
                        data.deliveryCharge
                    ) === 0
                        ? "₹0"
                        : `₹${Number(
                            data.deliveryCharge
                        ).toLocaleString(
                            "en-IN"
                        )}`;

            }

        }
    );

}


/* =========================================================
   23. SIDEBAR NAVIGATION
========================================================= */

function setupSidebarNavigation() {

    const links =
        document.querySelectorAll(
            ".sidebar-link"
        );


    links.forEach(
        (link) => {

            link.addEventListener(
                "click",
                () => {

                    links.forEach(
                        (item) => {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    link.classList.add(
                        "active"
                    );

                }
            );

        }
    );

}


/* =========================================================
   24. FINAL INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadBusinessDetails();

        addMissingProductFields();

        loadProductDetails();

        loadDeliveryDetails();

        loadSubscriptionDetails();

        loadPaymentDetails();

        loadOffers();

        loadSEO();

        ensureImageAdminCards();

        setupImageUploads();

        setupLogout();

        setupBusinessDetails();

        setupProductButtons();

        setupDelivery();

        setupSubscription();

        setupPayment();

        setupOffers();

        setupSEO();

        setupSidebarNavigation();

        refreshDashboardStatus();

    }
);


/* =========================================================
   FINAL ADMIN DASHBOARD JS END
========================================================= */