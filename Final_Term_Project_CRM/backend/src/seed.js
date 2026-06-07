const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "../.env") });

const Customer = require("./models/customer.model");
const User = require("./models/user.model");

const customersData = [
  { name: "Ali Raza", email: "ali.raza@systems.com.pk", phone: "3001234567", company: "Systems Limited", status: "Lead" },
  { name: "Fatima Tariq", email: "fatima@arbisoft.com", phone: "3129876543", company: "Arbisoft", status: "Lead" },
  { name: "Usman Ahmed", email: "usman@netsole.com", phone: "3334567890", company: "NetSol Technologies", status: "Lead" },
  { name: "Ayesha Khan", email: "ayesha@contour.pk", phone: "3456789012", company: "Contour Software", status: "Lead" },
  { name: "Bilal Qureshi", email: "bilal@ibex.co", phone: "3212345678", company: "Ibex Global", status: "Lead" },
  { name: "Zainab Malik", email: "zainab@10pearls.com", phone: "3013456789", company: "10Pearls", status: "Active" },
  { name: "Hamza Shafiq", email: "hamza@tps.com.pk", phone: "3345678901", company: "TPS Pakistan", status: "Active" },
  { name: "Sana Mahmood", email: "sana@teradata.com.pk", phone: "3156789012", company: "Teradata Pakistan", status: "Active" },
  { name: "Saad Hassan", email: "saad@xgrid.co", phone: "3427890123", company: "Xgrid", status: "Active" },
  { name: "Hira Naveed", email: "hira@motives.pk", phone: "3028901234", company: "Motives International", status: "Active" },
  { name: "Omer Farooq", email: "omer@avanceon.ae", phone: "3229012345", company: "Avanceon", status: "Inactive" },
  { name: "Khadija Asif", email: "khadija@confiz.com", phone: "3350123456", company: "Confiz", status: "Inactive" },
  { name: "Raza Ali", email: "raza@curemd.com", phone: "3111234509", company: "CureMD", status: "Inactive" },
  { name: "Nida Shoaib", email: "nida@afiniti.com", phone: "3462345610", company: "Afiniti", status: "Inactive" },
  { name: "Hassan Abbas", email: "hassan@tkxel.com", phone: "3033456721", company: "Tkxel", status: "Inactive" },
];

async function seedDatabase() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing in backend/.env file");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    const admin = await User.findOne({ role: "admin" });
    if (!admin) {
      throw new Error("No admin user found. Start the backend server first to create the admin user.");
    }

    await Customer.deleteMany();
    console.log("Cleared existing customers");

    const customersWithOwner = customersData.map((c) => ({
      ...c,
      ownerId: admin._id,
    }));

    const insertedCustomers = await Customer.insertMany(customersWithOwner);
    console.log(`Successfully inserted ${insertedCustomers.length} customers.\n`);

    insertedCustomers.forEach((c, index) => {
      console.log(`${index + 1}. ${c.name} | ${c.company} | ${c.status}`);
    });
  } catch (error) {
    console.error("Seeding Error:", error.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
    process.exit(0);
  }
}

seedDatabase();
