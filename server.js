const { readFileSync } = require('fs');
const { createServer } = require('http');
const { parse } = require('url');
const { renderToString } = require('react-dom/server')
const React = require('react')
const htmlTemplate = readFileSync(`${__dirname}/index.html`, 'utf-8');
const clientTemplate = readFileSync(`${__dirname}/client.js`, 'utf-8');

const server = createServer((req, res) => {
    const pathname = parse(req.url, true).pathname;
    if (pathname === '/') {
        const renderedHtml = renderToString(<Home />)
        const html = htmlTemplate.replace('%%%CONTENT%%%', renderedHtml)
        res.writeHead(200, {
            "content-type": "text/html"
        })
        res.end(html);
    } else if (pathname === '/client.js') {
        res.writeHead(200, {
            "content-type": "application/javascript"
        })
        res.end(clientTemplate);
    } else {
        res.end('the URL cannot be found');
    }
});

server.listen(8000, () => {
    console.log('Listening on port 8000');
});


const pizzas = [
    {
        name: "Focaccia",
        price: 6,
    },
    {
        name: "Pizza Margherita",
        price: 10,
    },
    {
        name: "Pizza Spinaci",
        price: 12,
    },
    {
        name: "Pizza Funghi",
        price: 12,
    },
    {
        name: "Pizza Prosciutto",
        price: 15,
    },
];

function Home() {
    return (
        <div>
            <h1>🍕 Fast React Pizza Co.</h1>
            <p>This page has been rendered with React on the server 🤯</p>

            <h2>Menu</h2>
            <ul>
                {pizzas.map((pizza) => (
                    <MenuItem pizza={pizza} key={pizza.name} />
                ))}
            </ul>
        </div>
    );
}

function Counter() {
    const [count, setCount] = React.useState(0);
    return (
        <div>
            <button onClick={() => setCount((c) => c + 1)}>+1</button>
            <span>{count}</span>
        </div>
    );
}

function MenuItem({ pizza }) {
    return (
        <li>
            <h4>
                {pizza.name} (${pizza.price})
            </h4>
            <Counter />
        </li>
    );
}