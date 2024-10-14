const productsArr = window.allItem;
const allCategories = window.allCategory;
const allBrands = window.allBrand;

//DELETE PROUCT

const deletePopupModal = document.querySelector('#popup-modal');
const deletePopupModalHeading = deletePopupModal.querySelector('h3');
const confirmDeleteBtn = deletePopupModal.querySelector('button[type="submit"]');
const deleteBtn = document.querySelectorAll('.delete-btn');

deleteBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
        deletePopupModalHeading.textContent = `Are you sure you want to delete ${btn.getAttribute(
            'data-prod',
        )}?`;
        console.log(confirmDeleteBtn);
        confirmDeleteBtn.parentElement.parentElement.action = `/deleteproduct/${btn.getAttribute(
            'data-id',
        )}?_method=DELETE`;
    });
});

//UPDATE PRODUCT

const updateBtn = document.querySelectorAll('.update-btn');
const updatePopupModal = document.querySelector('#update-modal');
const selectBrandElement = document.querySelector('select#brand');
const selectCategoryElement = document.querySelector('select#category');

const removeDuplicateForArrOption = (arr, prop) => {
    const seen = new Set();
    return arr.filter((item) => {
        const value = item[prop];
        if (seen.has(value)) {
            return false;
        }
        seen.add(value);
        return true;
    });
};

const addOptionIntoSelectTag = (arr, prop, ele) => {
    arr.forEach((prod) => {
        const selectEle = ele;
        const option = new Option(prod[prop], prod[prop]);
        selectEle.add(option);
    });
};

addOptionIntoSelectTag(allBrands, 'brand', selectBrandElement);
addOptionIntoSelectTag(allCategories, 'category', selectCategoryElement);

const handleUpdate = (e) => {
    const findProduct = productsArr.find(
        (prod) => prod.id === Number(e.target.getAttribute('data-id')),
    );
    updatePopupModal.querySelector('form').action = `/updateproduct/${e.target.getAttribute(
        'data-id',
    )}?_method=PUT`;
    document.querySelector('input#product').value = findProduct.product;
    document.querySelector('input#stock').value = findProduct.stock;
    document.querySelector('input#price').value = findProduct.price;
    selectBrandElement.querySelector(`option[value="${findProduct.brand}"]`).selected = true;
    selectCategoryElement.querySelector(`option[value="${findProduct.category}"]`).selected = true;
};

updateBtn.forEach((btn) => btn.addEventListener('click', handleUpdate));
