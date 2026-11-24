const http = require('http');

const motoGP = [
  {
    circuit: 'Losail',
    location: 'Qatar',
    winner: {
      firstName: 'Andrea',
      lastName: 'Dovizioso',
      country: 'Italy'
    }
  },
  {
    circuit: 'Autodromo',
    location: 'Argentine',
    winner: {
      firstName: 'Cal',
      lastName: 'Crutchlow',
      country: 'UK'
    }
  },
  {
    circuit: 'De Jerez',
    location: 'Spain',
    winner: {
      firstName: 'Valentino',
      lastName: 'Rossi',
      country: 'Italy'
    }
  },
  {
    circuit: 'Mugello',
    location: 'Italy',
    winner: {
      firstName: 'Andrea',
      lastName: 'Dovizioso',
      country: 'Italy'
    }
  }
];

// Fungsi mengelompokkan data berdasarkan Negara Pemenang (/country)
function groupByCountry(data) {
  const grouped = {};
  for (let i = 0; i < data.length; i++) {
    const event = data[i];
    const country = event.winner.country;
    const fullName = `${event.winner.firstName} ${event.winner.lastName}`;
    const winLocation = `${event.circuit}, ${event.location}`;

    if (!grouped[country]) {
      grouped[country] = {
        winningCircuits: [],
        totalWin: 0
      };
    }

    grouped[country].winningCircuits.push({
      name: fullName,
      winLocation: winLocation
    });
    grouped[country].totalWin++;
  }
  return grouped;
}

// Fungsi mengelompokkan data berdasarkan Nama Pemenang (/name)
function groupByName(data) {
  const grouped = {};
  for (let i = 0; i < data.length; i++) {
    const event = data[i];
    const fullName = `${event.winner.firstName} ${event.winner.lastName}`;
    const winLocation = `${event.circuit}, ${event.location}`;

    if (!grouped[fullName]) {
      grouped[fullName] = {
        country: event.winner.country,
        winningCircuits: [],
        totalWin: 0
      };
    }

    grouped[fullName].winningCircuits.push({
      circuit: event.circuit,
      location: event.location,
      winLocation: winLocation
    });
    grouped[fullName].totalWin++;
  }
  return grouped;
}

// Membuat Web Server pada Port 8000
const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');

  if (req.url === '/') {
    // 1. Tampilkan seluruh data motoGP
    res.writeHead(200);
    res.end(JSON.stringify(motoGP, null, 2));
  } else if (req.url === '/country') {
    // 2. Tampilkan data dikelompokkan berdasarkan negara
    res.writeHead(200);
    res.end(JSON.stringify(groupByCountry(motoGP), null, 2));
  } else if (req.url === '/name') {
    // 3. Tampilkan data dikelompokkan berdasarkan nama pemenang
    res.writeHead(200);
    res.end(JSON.stringify(groupByName(motoGP), null, 2));
  } else {
    // 4. Selain URL di atas, tampilkan "Bad Request"
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.end('Bad Request');
  }
});

const PORT = 8000;
server.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});