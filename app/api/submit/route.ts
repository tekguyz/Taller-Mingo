import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    
    // Deconstruct fields with defaults for solid console diagnostic reports
    const {
      make = "Unknown Make",
      model = "Unknown Model",
      year = "Unknown Year",
      drive = "Unknown Drive",
      service = "Not Specified",
      phone = "No Phone Provided",
      contactMethod = "Not Specified",
      notes = "No notes provided"
    } = payload;

    // Output formal industrial styled logs directly to server runtime shell console
    console.log("==================================================");
    console.log("🛠️  TALLER MINGO - NEW PREMIUM QUOTE SUBMISSION");
    console.log(`📡 STATUS: ACTIVE | TIME: ${new Date().toISOString()}`);
    console.log("==================================================");
    console.log(`🚗 VEHICLE: ${year} ${make} ${model} [DRIVE: ${drive}]`);
    console.log(`⚙️  SERVICE REQ: ${service}`);
    console.log(`📞 CUSTOMER TEL: ${phone} (Method: ${contactMethod})`);
    console.log(`📝 NOTES/SPECS: ${notes}`);
    console.log("==================================================");

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("❌ ERROR EXECUTING SERVERLESS SUBMIT MODULE:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Processing Error" },
      { status: 500 }
    );
  }
}
