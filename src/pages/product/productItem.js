import React, { Component } from 'react';

class productItem extends Component {
    render() {
        const {listItem} = this.props;
        return (
            <div className="productCon" >
                <div className="p_top">
                    <div className="lf">
                        <h1>{listItem.type}<span>建议购买{listItem.typeMoney}</span></h1>
                        <h2>{listItem.tips}</h2>
                    </div>
                    <img src={listItem.typePic} alt=""/>
                </div>

                <div className="p_bot">
                    <img src={listItem.productPic} alt=""/>
                    <div className="rt" onClick={()=>{
                        this.toHref(listItem.productUrl)
                    }}>
                        <h1>{listItem.productName}</h1>
                        <p>保障期间：<span>{listItem.insurePament}</span></p>
                        <b></b>
                    </div>
                </div>
            </div>
        );
    }


    toHref = (url) =>{
        window.location.href = url;
    }
}


export default productItem;