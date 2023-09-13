import React, {useEffect, useContext} from 'react'
import {Context} from "../context";
import {withRouter} from "react-router-dom";

// import {getGlobalData} from '../client/web3'
import {bn} from "../utils";

import Breadcrumbs from "../components/Common/Breadcrumb";

import {Container, Row, Col} from "reactstrap";
import {withNamespaces} from 'react-i18next';
import PoolTable from "../components/Sections/PoolTable";
// import PoolsPaneSide from "../components/Sections/PoolsPaneSide";

const Pools = (props) => {

    const context = useContext(Context)

    // const [globalData, setGlobalData] = useState({
    //     totalPooled: 0,
    //     totalFees: 0,
    //     totalVolume: 0,
    //     addLiquidityTx: 0,
    //     removeLiquidityTx: 0,
    //     swapTx: 0,
    // });

    // const [totalVolume, setTotalVolume] = useState(0)
    // const [totalValueLocked, setTotalValueLocked] = useState(0)

    useEffect(() => {
        getData()
        // eslint-disable-next-line
    }, [context.poolsDataComplete])

    const getData = async () => {
        //setGlobalData(await getGlobalData())
        if (context.poolsDataComplete) {
            let data = context.poolsData.map(a => a)
            let volume = 0
            let tvl = 0
            for (let i = 0; i < data.length; i++) {
                volume = bn(volume).plus(bn(data[i].volume))
                tvl = bn(tvl).plus(bn(data[i].baseAmount))
            }
            // setTotalVolume(volume)
            // setTotalValueLocked(tvl)
        }
    }

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title={props.t("App")} breadcrumbItem={props.t("Pools")}/>
                    <Row>
                        {/* <Col xs="12">
                            <PoolsPaneSide totalVolume={totalVolume} tvl={totalValueLocked} />
                        </Col> */}
                        <Col xs="12">
                            <PoolTable/>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
};

export default withRouter(withNamespaces()(Pools));


