const users = [
    {
        name: "Alice Johnson",
        email: "alice.johnson@example.com",
        phone: "01123456789",
        address: "123 Elm Street",
        password: "password123!"
    },
    {
        name: "Bob Smith",
        email: "bob.smith@example.com",
        phone: "01234567890",
        address: "456 Maple Avenue",
        password: "mypassword456!"
    },
    {
        name: "Carol Davis",
        email: "carol.davis@example.com",
        phone: "01345678901",
        address: "789 Oak Road",
        password: "securepass789!"
    },
    {
        name: "David Brown",
        email: "david.brown@example.com",
        phone: "01456789012",
        address: "101 Pine Lane",
        password: "david1234!"
    },
    {
        name: "Eva Wilson",
        email: "eva.wilson@example.com",
        phone: "01567890123",
        address: "202 Birch Drive",
        password: "eva5678!"
    },
    {
        name: "Frank Moore",
        email: "frank.moore@example.com",
        phone: "01678901234",
        address: "303 Cedar Street",
        password: "frank8765!"
    },
    {
        name: "Grace Taylor",
        email: "grace.taylor@example.com",
        phone: "01789012345",
        address: "404 Fir Boulevard",
        password: "grace4321!"
    },
    {
        name: "Henry Anderson",
        email: "henry.anderson@example.com",
        phone: "01890123456",
        address: "505 Redwood Way",
        password: "henry9876!"
    },
    {
        name: "Ivy Thomas",
        email: "ivy.thomas@example.com",
        phone: "01901234567",
        address: "606 Willow Path",
        password: "ivy6543!"
    },
    {
        name: "Jack Martin",
        email: "jack.martin@example.com",
        phone: "01012345678",
        address: "707 Spruce Circle",
        password: "jack3210!"
    },
    {
        name: "Karen Lee",
        email: "karen.lee@example.com",
        phone: "01123456780",
        address: "808 Fir Road",
        password: "karen0987!"
    },
    {
        name: "Leo Harris",
        email: "leo.harris@example.com",
        phone: "01234567891",
        address: "909 Pine Drive",
        password: "leo5432!"
    },
    {
        name: "Mia Clark",
        email: "mia.clark@example.com",
        phone: "01345678902",
        address: "1010 Maple Avenue",
        password: "mia2109!"
    },
    {
        name: "Nathan Lewis",
        email: "nathan.lewis@example.com",
        phone: "01456789013",
        address: "1211 Oak Street",
        password: "nathan9087!"
    },
    {
        name: "Olivia Walker",
        email: "olivia.walker@example.com",
        phone: "01567890124",
        address: "1312 Birch Lane",
        password: "olivia5678!"
    },
    {
        name: "Paul Allen",
        email: "paul.allen@example.com",
        phone: "01678901235",
        address: "1413 Cedar Avenue",
        password: "paul8765!"
    },
    {
        name: "Quinn Scott",
        email: "quinn.scott@example.com",
        phone: "01789012346",
        address: "1514 Redwood Drive",
        password: "quinn3456!"
    },
    {
        name: "Rachel Young",
        email: "rachel.young@example.com",
        phone: "01890123457",
        address: "1615 Willow Way",
        password: "rachel7890!"
    },
    {
        name: "Steve King",
        email: "steve.king@example.com",
        phone: "01901234568",
        address: "1716 Spruce Path",
        password: "steve6543!"
    },
    {
        name: "Tina Carter",
        email: "tina.carter@example.com",
        phone: "01012345679",
        address: "1817 Pine Boulevard",
        password: "tina3210!"
    },
    {
        name: "Ulysses Adams",
        email: "ulysses.adams@example.com",
        phone: "01123456781",
        address: "1918 Maple Street",
        password: "ulysses9876!"
    },
    {
        name: "Vera Phillips",
        email: "vera.phillips@example.com",
        phone: "01234567892",
        address: "2020 Oak Drive",
        password: "vera6543!"
    },
    {
        name: "Will Green",
        email: "will.green@example.com",
        phone: "01345678903",
        address: "2121 Birch Path",
        password: "will2109!"
    },
    {
        name: "Xena Mitchell",
        email: "xena.mitchell@example.com",
        phone: "01456789024",
        address: "2222 Cedar Boulevard",
        password: "xena9087!"
    },
    {
        name: "Yvonne Wright",
        email: "yvonne.wright@example.com",
        phone: "01567890135",
        address: "2323 Redwood Street",
        password: "yvonne5678!"
    },
    {
        name: "Zachary Robinson",
        email: "zachary.robinson@example.com",
        phone: "01678901246",
        address: "2424 Willow Lane",
        password: "zachary8765!"
    },
    {
        name: "Anna Thompson",
        email: "anna.thompson@example.com",
        phone: "01789012357",
        address: "2525 Spruce Drive",
        password: "anna5432!"
    },
    {
        name: "Brian White",
        email: "brian.white@example.com",
        phone: "01890123468",
        address: "2626 Pine Avenue",
        password: "brian0987!"
    },
    {
        name: "Catherine Lee",
        email: "catherine.lee@example.com",
        phone: "01901234579",
        address: "2727 Maple Boulevard",
        password: "catherine2109!"
    },
    {
        name: "Daniel Hall",
        email: "daniel.hall@example.com",
        phone: "01012345680",
        address: "2828 Oak Lane",
        password: "daniel0987!"
    },
    {
        name: "Ella Turner",
        email: "ella.turner@example.com",
        phone: "01123456782",
        address: "2929 Birch Drive",
        password: "ella3210!"
    },
    {
        name: "Frankie Martinez",
        email: "frankie.martinez@example.com",
        phone: "01234567893",
        address: "3030 Cedar Path",
        password: "frankie8765!"
    },
    {
        name: "Gina Rodriguez",
        email: "gina.rodriguez@example.com",
        phone: "01345678904",
        address: "3131 Redwood Avenue",
        password: "gina4321!"
    },
    {
        name: "Harry Murphy",
        email: "harry.murphy@example.com",
        phone: "01456789025",
        address: "3232 Willow Street",
        password: "harry8765!"
    },
    {
        name: "Isla Cooper",
        email: "isla.cooper@example.com",
        phone: "01567890136",
        address: "3333 Spruce Boulevard",
        password: "isla5432!"
    },
    {
        name: "Jake Rivera",
        email: "jake.rivera@example.com",
        phone: "01678901247",
        address: "3434 Pine Street",
        password: "jake2109!"
    },
    {
        name: "Kara Morris",
        email: "kara.morris@example.com",
        phone: "01789012368",
        address: "3535 Maple Avenue",
        password: "kara9876!"
    },
    {
        name: "Liam Walker",
        email: "liam.walker@example.com",
        phone: "01890123479",
        address: "3636 Oak Road",
        password: "liam4321!"
    },
    {
        name: "Mia Cooper",
        email: "mia.cooper@example.com",
        phone: "01901234580",
        address: "3737 Birch Path",
        password: "mia8765!"
    },
    {
        name: "Nina Baker",
        email: "nina.baker@example.com",
        phone: "01012345681",
        address: "3838 Cedar Street",
        password: "nina5432!"
    },
    {
        name: "Oliver Gonzalez",
        email: "oliver.gonzalez@example.com",
        phone: "01123456783",
        address: "3939 Redwood Drive",
        password: "oliver0987!"
    }
];

module.exports = users;
