import React, { useContext, useState, useRef, useEffect } from 'react'
import { ContextSource } from './App.js'

function ItemDetails(routerProps) { // Link > Route> 이곳으로 보낸 정보
    const selectedItem = routerProps.history.location.state  // Product.js에서 보낸 p (클릭한 아이템정보)
    // // {name: 'ShootingStar', price: 78, id: 194, img: 'https://59c', quantityLeft: 65}

    const { dispatchCart } = useContext(ContextSource)
    const changeQuantity = useRef()

    function addToCart() {
        const selectedQuantity = changeQuantity.current.value
        dispatchCart({ type: 'ADD_TO_CART', payload: { selectedItem, selectedQuantity } })
        changeQuantity.current.value = 1
    }

    return (
        <div style={{ display: 'flex' }}>
            <div>
                <h4>제목: {selectedItem.name}</h4>
                <div>가격: ${selectedItem.price}</div>
                <div>남은 수량: {selectedItem.quantityLeft}</div>
                <img src={selectedItem.img} alt="" style={{ width: '400px' }} />
            </div>

            <div className="buttonContainer">
                <select name="qauntity" id="" ref={changeQuantity}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <br />
                <button onClick={addToCart} style={{ padding: '10px' }}>Add to Cart</button>
                <br />
                <button onClick={() => routerProps.history.goBack()}>Go Back to Menu</button>
            </div>
        </div>
    )
}

export default ItemDetails
