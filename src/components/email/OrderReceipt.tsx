import * as React from "react";
import {
  Html,
  Body,
  Head,
  Heading,
  Container,
  Preview,
  Section,
  Text,
  Button,
  Hr,
  Row,
  Column,
  Img,
  Link,
} from "@react-email/components";

interface OrderReceiptProps {
  orderId: string;
  total: number;
  customerName: string;
  items: {
    productName: string;
    quantity: number;
    price: number;
    image: string;
  }[];
  shippingAddress: any;
}

export const OrderReceipt = ({
  orderId,
  total,
  customerName,
  items,
  shippingAddress,
}: OrderReceiptProps) => {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date());

  return (
    <Html>
      <Head />
      <Preview>Order Confirmed #{orderId.slice(0, 8)}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* --- BRAND HEADER --- */}
          <Section style={header}>
            <Heading style={logo}>DIKSHYA LIMBU</Heading>
          </Section>

          {/* --- HERO MESSAGE --- */}
          <Section style={heroSection}>
            <Text style={heroTitle}>Thank you for your order</Text>
            <Text style={heroText}>
              We are getting your order ready to be shipped. We will notify you
              when it has been sent.
            </Text>
            <Button
              style={button}
              href={`https://dikshya-portfolio.vercel.app/shop`}
            >
              Visit Store
            </Button>
          </Section>

          <Hr style={divider} />

          {/* --- ORDER META --- */}
          <Section style={metaSection}>
            <Row>
              <Column>
                <Text style={label}>Order Number</Text>
                <Text style={value}>#{orderId.slice(0, 8).toUpperCase()}</Text>
              </Column>
              <Column align="right">
                <Text style={label}>Date</Text>
                <Text style={value}>{formattedDate}</Text>
              </Column>
            </Row>
          </Section>

          <Hr style={divider} />

          {/* --- ITEMS TABLE --- */}
          <Section style={itemsSection}>
            <Text style={sectionHeader}>Items Ordered</Text>
            {items.map((item, index) => (
              <Row key={index} style={itemRow}>
                <Column style={{ width: "80px" }}>
                  <Img
                    src={item.image}
                    width="70"
                    height="90"
                    style={productImage}
                  />
                </Column>
                <Column style={productDetails}>
                  <Text style={productTitle}>{item.productName}</Text>
                  <Text style={productMeta}>Qty: {item.quantity}</Text>
                </Column>
                <Column align="right" style={{ verticalAlign: "top" }}>
                  <Text style={productPrice}>
                    Rs {item.price.toLocaleString()}
                  </Text>
                </Column>
              </Row>
            ))}
          </Section>

          <Hr style={divider} />

          {/* --- TOTALS --- */}
          <Section style={totalsSection}>
            <Row style={{ marginBottom: "10px" }}>
              <Column>
                <Text style={totalLabel}>Subtotal</Text>
              </Column>
              <Column align="right">
                <Text style={totalValue}>Rs {total.toLocaleString()}</Text>
              </Column>
            </Row>
            <Row style={{ marginBottom: "10px" }}>
              <Column>
                <Text style={totalLabel}>Shipping</Text>
              </Column>
              <Column align="right">
                <Text style={totalValue}>Free</Text>
              </Column>
            </Row>
            <Hr style={dashedDivider} />
            <Row>
              <Column>
                <Text style={finalTotalLabel}>Total</Text>
              </Column>
              <Column align="right">
                <Text style={finalTotalValue}>Rs {total.toLocaleString()}</Text>
              </Column>
            </Row>
          </Section>

          {/* --- ADDRESS --- */}
          <Section style={addressSection}>
            <Row>
              <Column>
                <Text style={sectionHeader}>Shipping Address</Text>
                <Text style={addressText}>
                  {customerName}
                  <br />
                  {shippingAddress?.line1}
                  <br />
                  {shippingAddress?.line2 && (
                    <>
                      {shippingAddress.line2}
                      <br />
                    </>
                  )}
                  {shippingAddress?.city}, {shippingAddress?.state}{" "}
                  {shippingAddress?.postal_code}
                  <br />
                  {shippingAddress?.country}
                </Text>
              </Column>
            </Row>
          </Section>

          {/* --- FOOTER --- */}
          <Section style={footer}>
            <Row align="center">
              <Column>
                <Link href="#" style={socialLink}>
                  Instagram
                </Link>
                <span style={{ padding: "0 10px", color: "#ccc" }}>|</span>
                <Link href="#" style={socialLink}>
                  TikTok
                </Link>
                <span style={{ padding: "0 10px", color: "#ccc" }}>|</span>
                <Link href="#" style={socialLink}>
                  Contact
                </Link>
              </Column>
            </Row>
            <Text style={footerText}>
              © {new Date().getFullYear()} Dikshya Limbu. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default OrderReceipt;

// --- LUXURY STYLES ---

const main = {
  backgroundColor: "#F9F8F4", // Your Cream Background
  fontFamily: '"Times New Roman", Times, serif',
  padding: "40px 0",
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "40px 50px",
  maxWidth: "600px",
  border: "1px solid #E5E5E5",
};

const header = {
  textAlign: "center" as const,
  marginBottom: "40px",
};

const logo = {
  fontSize: "28px",
  letterSpacing: "0.25em",
  fontWeight: "bold",
  textTransform: "uppercase" as const,
  color: "#1a1a1a",
  margin: "0",
  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', // Sans for Logo to match site
};

const heroSection = {
  textAlign: "center" as const,
  marginBottom: "40px",
};

const heroTitle = {
  fontSize: "24px",
  fontFamily: '"Times New Roman", Times, serif', // Serif for headers
  color: "#1a1a1a",
  margin: "0 0 15px",
};

const heroText = {
  fontSize: "14px",
  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
  color: "#666666",
  lineHeight: "24px",
  margin: "0 0 25px",
};

const button = {
  backgroundColor: "#1a1a1a",
  color: "#ffffff",
  padding: "14px 30px",
  fontSize: "10px",
  textTransform: "uppercase" as const,
  letterSpacing: "0.2em",
  textDecoration: "none",
  fontWeight: "bold",
  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
};

const divider = {
  borderColor: "#E5E5E5",
  margin: "30px 0",
};

const dashedDivider = {
  borderColor: "#E5E5E5",
  borderStyle: "dashed",
  margin: "15px 0",
};

const metaSection = {
  marginBottom: "20px",
};

const itemsSection = {
  marginBottom: "20px",
};

const sectionHeader = {
  fontSize: "10px",
  textTransform: "uppercase" as const,
  letterSpacing: "0.2em",
  color: "#999999",
  marginBottom: "20px",
  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
};

const label = {
  fontSize: "10px",
  textTransform: "uppercase" as const,
  letterSpacing: "0.15em",
  color: "#888888",
  marginBottom: "5px",
  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
};

const value = {
  fontSize: "14px",
  color: "#1a1a1a",
  fontFamily: '"Times New Roman", Times, serif',
};

const itemRow = {
  marginBottom: "20px",
  borderBottom: "1px solid #f5f5f5",
  paddingBottom: "20px",
};

const productImage = {
  objectFit: "cover" as const,
  backgroundColor: "#f4f4f4",
};

const productDetails = {
  paddingLeft: "20px",
  verticalAlign: "top",
};

const productTitle = {
  fontSize: "16px",
  color: "#1a1a1a",
  margin: "0 0 8px 0",
  fontFamily: '"Times New Roman", Times, serif',
};

const productMeta = {
  fontSize: "12px",
  color: "#888888",
  margin: "0",
  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
};

const productPrice = {
  fontSize: "14px",
  color: "#1a1a1a",
  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
};

const totalsSection = {
  width: "100%",
};

const totalLabel = {
  fontSize: "12px",
  color: "#666666",
  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
};

const totalValue = {
  fontSize: "12px",
  color: "#1a1a1a",
  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
};

const finalTotalLabel = {
  fontSize: "14px",
  fontWeight: "bold",
  color: "#1a1a1a",
  textTransform: "uppercase" as const,
  letterSpacing: "0.1em",
  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
};

const finalTotalValue = {
  fontSize: "18px",
  fontWeight: "bold",
  color: "#1a1a1a",
  fontFamily: '"Times New Roman", Times, serif',
};

const addressSection = {
  marginTop: "40px",
  backgroundColor: "#F9F8F4",
  padding: "30px",
};

const addressText = {
  fontSize: "14px",
  lineHeight: "24px",
  color: "#333333",
  fontFamily: '"Times New Roman", Times, serif',
  margin: "0",
};

const footer = {
  textAlign: "center" as const,
  marginTop: "50px",
};

const socialLink = {
  fontSize: "10px",
  textTransform: "uppercase" as const,
  letterSpacing: "0.2em",
  color: "#1a1a1a",
  textDecoration: "none",
  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
};

const footerText = {
  fontSize: "10px",
  color: "#999999",
  marginTop: "20px",
  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
};
