import React from "react";
import Header from "@/app/_components/section-header";
import Footer from "@/app/_components/section-footer";
import SectionWalletDetails from "@/app/wallets/[address]/_components/section-wallet";
import { notFound } from "next/navigation";
import { SuccessGetWalletResponse } from "@/app/_api-types/wallets";

async function WalletDetailsPage({
  params,
}: {
  params: Promise<{ address: string }>;
}) {
  const { address } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/wallets/${address}`
  );

  if (!res.ok) {
    notFound();
  }

  const walletData: SuccessGetWalletResponse = await res.json();

  if (!walletData.data) {
    notFound();
  }

  return (
    <main className="min-h-screen overflow-x-hidden">
      <Header />
      <SectionWalletDetails wallet={walletData.data} />
      <Footer />
    </main>
  );
}

export default WalletDetailsPage;
