// index.js
import Map from '../components/Map' // new
import Head from 'next/head'

const Index = () => (
    <div>
        <Head>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" />
            <meta name="robots" content="noindex" />
        </Head>
        <div className="container-fluid grey">
            hello testing production
            <div className="row">
                <div className="col">
                    <h1 className="text-center display-3">The North Coast Pizza's chain weather map system</h1>
                    <p className="lead text-center">Find the weather for the city bellow</p>
                    <Map />
                </div>
            </div>
            <style jsx>{`
            h1 {
                font-size: 3.5rem;
                font-weight: 200;
            }

            .grey {
                background: #EEE
            }
        `}</style>
        </div>
    </div>
);

export default Index;