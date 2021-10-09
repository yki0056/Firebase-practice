export const cartReducer = (cart, { type, payload }) => {
    switch (type) {
        case 'ADD_TO_CART':
            const itemName = payload.selectedItem.name;
            const itemId = payload.selectedItem.id;
            const itemPrice = payload.selectedItem.price;
            const itemImg = payload.selectedItem.img;
            const quantityBuy = payload.selectedQuantity
            // const itemRemain = payload.selectedItem.quantityLeft;
            // console.log(payload);
            let coppiedCart = [...cart, { 'name': itemName, 'id': itemId, 'price': itemPrice, 'quantity': quantityBuy, 'img': itemImg }];
            // 카트배열안에 이미 중복이 들어와 있을수 있는 상태
            let coppiedCart2 = coppiedCart.reduce((acc, curr) => {
                // ex) coppiedCart배열안 정보를 하나씩 검사해서  이름이 같지않으면 acc배열에 넣음 
                // 배열안 정보 찾기  (중복되는객체)
                let overlapObj = acc.find(a => a.name === curr.name)
                // 배열을 돌다가 마지막에 새로넣은 중복정보(curr.name)와 acc배열안 정보 a.name과 중복됨. 
                if (overlapObj) {
                    let combinedNumber = Number(overlapObj.quantity) + Number(curr.quantity);
                    overlapObj.quantity = combinedNumber
                } else {    // 배열안에 같은 이름이 없다면 acc배열에 추가!
                    acc.push(curr)
                }
                return acc
            }, [])

            return coppiedCart2

        case 'CHANGE_QUANT':  // 카트안에서 수량을 수정시  기존 카트배열 수량 조정 
            const copyCart = cart.map((cc) => {
                if (cc.name == payload.selectedProduct) {
                    cc.quantity = payload.selectedQauntity
                }
                return cc
            })
            return copyCart;

        case 'REMOVE_ITEM':
            const removeItem = payload.removeSelectedProduct;
            const copyCart2 = cart.filter((cc) => {
                return cc.name !== removeItem; // removeItem과 이름이 같지 않은면 남김.
            })
            return copyCart2

        default: break;
    }

}

