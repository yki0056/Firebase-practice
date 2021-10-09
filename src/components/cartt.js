import React, { useContext, useRef } from 'react'
import { ContextSource } from './App'

function Cartcomp() {
    const { cart, dispatchCart } = useContext(ContextSource);
    // console.log(cart)
    function valChange(e) {
        const selectedQauntity = e.target.value;
        const selectedProduct = e.target.name;
        dispatchCart({ type: 'CHANGE_QUANT', payload: { selectedProduct, selectedQauntity } })
    }
    function removeProduct(e) {
        const removeSelectedProduct = e.target.name;
        dispatchCart({ type: 'REMOVE_ITEM', payload: { removeSelectedProduct } })
    }

    const totalPrice = cart.reduce((acc, cur) => { // 만약 2개의 물건이 카트에 있다면  $78 2개 , $99 1개
        const { price, quantity } = cur // cur.price, cur.quantity
        const numbQuantity = Number(quantity); // string값이던 cur.quantity을 넘버로 바꿈.
        acc += price * numbQuantity // 0 += 78 * 2  결과 156   ,  156 += 99 * 1 결과 255
        return acc // 255 
    }, 0)
    // console.log(totalPrice)

    const items = cart.map((item, index) => {
        return (
            <div key={index} style={{ width: '400px', border: '1px solid blue', display: 'flex' }}>
                <img src={item.img} alt="" style={{ width: '150px' }} />
                <div>
                    <h3>{item.name}</h3>
                    <div>price: ${item.price}</div>
                    <select name={item.name} id="" value={item.quantity} onChange={valChange}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    <br />
                    <button name={item.name} onClick={removeProduct}>Remove</button>
                </div>
            </div>
        )
    })


    return (
        <div>
            <h2>Your Cart</h2>
            {items}
            <h2>Total Price ${totalPrice}</h2>
        </div>
    )
}

export default Cartcomp
