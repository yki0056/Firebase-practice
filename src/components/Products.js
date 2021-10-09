import React, { useState, useEffect, useContext } from 'react';
import { useContextAuth } from './contexts/AuthContext.js'
import { Link } from 'react-router-dom'


function Products(test) {
    // console.log(test)
    const { db, collection, getDocs } = useContextAuth() // firestore데이타베이스에서 정보 빼올때 쓰는 메소드들
    const [productData, setproductData] = useState([]);

    const display = productData.map((p, i) => {
        return <Link key={i} to={{ pathname: `/products/${p.id}`, state: p }} style={{ border: '1px solid red' }}>
            <img src={p.img} alt="shoes image" style={{ width: '200px' }} />
            <h3>Product: {p.name}</h3>
            <p>Price: ${p.price}</p>
            <p>Id: {p.id}</p>
        </Link>
    })

    //  서버에 있는 물품정보 가져오기 ------------------------------------------------------------
    useEffect(() => {
        async function getProduct() { // db는 데이타베이스 정보
            // 문서를 가져와라 , 컬렉션 목록 db의 'product' 를 
            const productSnapshot = await getDocs(collection(db, 'product'));
            const productList = productSnapshot.docs.map(doc => doc.data());
            setproductData(productList);  //console.log(productList) // [{...}, {...}, {...}]
        }
        getProduct()

        return () => getProduct() // 클리어함수 (이곳컴포넌트를 떠날때 getProduct함수의 실행을 취소한다.)
    }, [db])


    return (
        <>
            1. 아이템 리스트 데이타 가져와서 리스트로 보여주기
            2. 카트 만들어서 넣게하기
            3. 카트에 넣은 정보르 유저와 연결하기
            <div style={{ display: 'grid', gridTemplateColumns: '400px 400px' }}>
                {display}
            </div>
        </>
    )
}

export default Products
