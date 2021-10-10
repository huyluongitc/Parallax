import React, { Component } from 'react';

import callApi from '../../../../utils/apiCaller';

class Follower extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Fler: []
        };
    }
    
    async componentDidMount() {
        const email = localStorage.getItem("email");
        let myShop = await callApi("shop/getShop", "POST", { email: email });
        this.setState({
            id: myShop.data._id,
        });
        let FlAll = await callApi("flShop/getAll", "POST", {idShop: this.state.id});
        if (FlAll.data !== "no") {
          this.setState({
            Fler: FlAll.data,
          });
        }
    }

    render() {
        // console.log(this.state);
        const elements = this.state.Fler.map(e=>{
            return  <div className="flHover" style={{display: "flex", justifyContent: "space-around"}} key={e._id}>
                        <label className="main__label">{e.nameUser}</label>
                        <label className="main__label">{e.updatedAt.slice(0,10)}</label>
                    </div>
        })
        return (
            <div>
                <div style={{display: "flex", justifyContent: "space-around"}}>
                    <label className="main__label">NgườI theo dõi</label>
                    <label className="main__label">Ngày theo dõi</label>
                </div>
                <hr style={{ width: "80%", margin: "10px auto" }} />
                {elements}
            </div>
        );
    }
}

export default Follower;