const minusBtns = document.querySelector('.minus-btn')
const plusBtns = document.querySelector('.plus-btn')
const quantityFields = document.querySelector('.quantity')
const totalPage = document.querySelector('.total-pages')
const checkboxes = document.querySelectorAll('.form-check-input');
const selectedSortOption = document.getElementById('selectedSortOption');
const dropdownMenu = document.querySelector('.dropdown-menu');




console.log('aaaa')
var filters = {
    
}
var sort = {
    updateAt: 1
}
var page = 1
// const getPage = ({filters, page,sort}) => {
//     const params=new URLSearchParams(
//          {
//             filters: JSON.stringify(filters),
//             page: page,
//             sort: JSON.stringify(sort)
//         }
//     );
//     const url = `/products?${params.toString()}`;
//     fetch(url,{
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json'
//         },
       
//     })
//     .then(response => {
//         if (response.ok) {
//           return response.text();
//         }
//         throw new Error('Network response was not ok.');
//       })
//       .then(html => {
//         document.querySelector('.product-list').innerHTML = html
//       })
    
//     .catch(error => {
//         console.error('Error:', error);
//     })
// }
function optionSort() {
    
}
function updateProducts() {
    page=quantityFields.value
    // Tạo URL mới với các bộ lọc được áp dụng
    const selectedRarity = [];

  // Lặp qua tất cả các checkbox
  checkboxes.forEach(checkbox => {
    if (checkbox.checked) {
      // Nếu checkbox được chọn, thêm giá trị của checkbox vào mảng selectedRarity
      selectedRarity.push(checkbox.id);
    }
  });
  if (selectedRarity.length > 0) {
    filters['rarity'] = selectedRarity
  } else {
    filters = {}
  }
    const params = new URLSearchParams({
      filters: JSON.stringify(filters),
      page: quantityFields.value,
      sort: JSON.stringify(sort)
    });
    if (Object.keys(filters).length == 0) {
        params.delete('filters')
        console.log('no filter')
    }
    
    const url = `/products?${params.toString()}`;
    
    // Chuyển hướng trình duyệt đến URL mới để lấy dữ liệu sản phẩm theo bộ lọc
    window.location.href = url;
  }
minusBtns.addEventListener('click', () => {
    page = quantityFields.value
    if (page > 1) {
        quantityFields.value = parseInt(page)-1
        page = quantityFields.value

        // getPage({filters, page: quantityFields.value, sort})
      updateProducts()
    }
})
plusBtns.addEventListener('click', () => {
    page = quantityFields.value
    const maxPage=totalPage.textContent.split('of')[1].trim();

    if (page < parseInt(maxPage)) {
        console.log(quantityFields.value)

        quantityFields.value = parseInt(page)+1
        updateProducts()
    }
})
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      updateProducts();
    });
  });

  document.addEventListener('DOMContentLoaded', function() {
    dropdownMenu.addEventListener('click', function(event) {
      if (event.target.classList.contains('dropdown-item')) {
        event.preventDefault();
        const selectedValue = event.target.getAttribute('data-value');
        selectedSortOption.textContent = event.target.textContent;
        
        // Xử lý selectedValue tùy theo giá trị được chọn
        console.log('Giá trị đã chọn:', selectedValue);
        
        // Thực hiện các hành động khác dựa trên giá trị đã chọn
      }
    });
  });
  