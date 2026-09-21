import { NextResponse } from "next/server";
import { getCurrentCustomer } from "@/lib/customer-auth";
import { readOrders } from "@/lib/admin-data";

export async function GET() {
  const customer = await getCurrentCustomer();
  if (!customer) {
    return NextResponse.json({ authenticated: false, customer: null, orders: [] });
  }

  const allOrders = readOrders();
  const customerOrders = allOrders.filter((o) => o.customerPhone.trim() === customer.phone.trim());

  return NextResponse.json({
    authenticated: true,
    customer: {
      id: customer.id,
      name: customer.name,
      phone: customer.phone,
      address: customer.address,
      createdAt: customer.createdAt,
    },
    orders: customerOrders,
  });
}
