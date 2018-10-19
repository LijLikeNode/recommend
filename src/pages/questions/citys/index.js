import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import cityData from '../../../assets/js/cityData';

class citys extends Component {
    render() {
        const {show,EnsureCity} = this.props;
        return (
            <div className={show?"c_container show":"c_container"}>
                <h3 className="title">您当前可能在</h3>
                <p onClick={()=>{
                    EnsureCity('北京',1)
                }}>北京</p>
                <div className="cityList">
                    {
                        cityData.map(item =>{
                            return (
                                <div className="word" key={item.tag}>
                                    <h3 id={item.tag}>{item.tag}</h3>
                                    <ul>
                                        {
                                            item.cities.map(city =>{
                                                return (
                                                    <li onClick={()=>{
                                                        EnsureCity(city.name,city.level?city.level:'')
                                                    }} key={city.name}>{city.name}</li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            )
                        })
                    }
                </div>


                <div className={show?"aside show":"aside"}>
                    {
                        ['A','B','C','D','E','F','G','H','J','K','L','M','N','P','Q','R','S','T','W','X','Y','Z'].map(word =>{
                            return (<a key={word} onClick={() =>{
                                this.scrollToAnchor(word)
                            }}>{word}</a>)
                        })
                    }
                </div>
            </div>
        );
    }

    scrollToAnchor = (anchorName) => {
        if (anchorName) {
            // 找到锚点
            let anchorElement = document.getElementById(anchorName);
            // 如果对应id的锚点存在，就跳转到锚点
            if(anchorElement) { anchorElement.scrollIntoView(); }
        }
      }
}

// citys.propTypes = {

// };

export default citys;