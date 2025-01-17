import React from "react";
import Header from "@/app/_components/section-header";
import Footer from "@/app/_components/section-footer";
import SectionWalletDetails from "@/app/wallets/[id]/_components/section-wallets-details";

async function WalletDetailsPage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Header />
      <SectionWalletDetails />
      <Footer />
    </main>
  );
}

export default WalletDetailsPage;
