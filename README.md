# SimplyShift

A minimal calendar for shift workers.

## Requirements
- Node.js version > 12
- Docker
- Docker Compose


## Installation

Update the respective `.env.example` files in the `client` and `server` directories.

```bash
cd server
npm install
cd ../client
npm install
```

## Usage

```bash
# start the server
cd server
npm run start:services # will start the dockerized Postgres instance
npm run start # will start the server
```

```bash
# start the client
cd client
npm run start
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


## License
[MIT](https://choosealicense.com/licenses/mit/)