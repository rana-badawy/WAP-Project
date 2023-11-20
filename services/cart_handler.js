let cartItems = [{id: 1, name: 'product1', quantity: 1, price: 20, available: 5, img: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_640.jpg"},
                {id: 2, name: 'product2', quantity: 1, price: 30, available: 3, img: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8fA%3D%3D"},
                {id: 3, name: 'product3', quantity: 1, price: 25, available: 2, img: "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg"},
                {id: 4, name: 'product4', quantity: 1, price: 14, available: 6, img: "https://media.istockphoto.com/id/1322277517/photo/wild-grass-in-the-mountains-at-sunset.jpg?s=612x612&w=0&k=20&c=6mItwwFFGqKNKEAzv0mv6TaxhLN3zSE43bWmFN--J5w="},
                {id: 5, name: 'product5', quantity: 1, price: 49, available: 1, img: "https://images.unsplash.com/photo-1495344517868-8ebaf0a2044a?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D"}];

function getCart(req, res, next) {
    res.render('cart', {items: cartItems});
}

module.exports = {getCart};