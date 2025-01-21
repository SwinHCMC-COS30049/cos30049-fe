import React from "react";
import Header from "../_components/section-header";
import Footer from "../_components/section-footer";
import SectionWallet from "./_components/section-wallets";

async function WalletPage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Header />
      <SectionWallet />
      <Footer />
    </main>
  );
}

export default WalletPage;
