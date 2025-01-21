"use client";

import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  Check,
  Wallet,
  Globe,
  TrendingUp,
  ShieldCheck,
  Bitcoin,
  Clock,
} from "lucide-react";

const CountUpAnimation = ({
  end,
  duration = 2000,
}: {
  end: number;
  duration?: number;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = (currentTime - startTime) / duration!;

      if (progress < 1) {
        setCount(Math.min(Math.floor(end * progress), end));
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration]);

  return count;
};

const LandingPage = () => {
  const whyChooseUs = [
    {
      title: "24/7",
      description: "Round-the-clock trading and support",
      icon: <Clock className="w-12 h-12" />,
      className: "md:col-span-1",
    },
    {
      title: "Global Access",
      description: "Trade from anywhere in the world",
      icon: <Globe className="w-12 h-12" />,
      className: "md:col-span-1",
    },
    {
      title: "High Liquidity",
      description: "Deep markets for instant trades",
      icon: <TrendingUp className="w-12 h-12" />,
      className: "md:col-span-1",
    },
    {
      title: "Bank-Grade Security",
      description: "Your assets are protected 24/7",
      icon: <ShieldCheck className="w-12 h-12" />,
      className: "md:col-span-1",
    },
  ];

  const steps = [
    {
      number: "1",
      title: "Create your wallet",
      description:
        "Set up your secure crypto wallet in minutes with easy verification",
      icon: <Wallet className="w-8 h-8" />,
    },
    {
      number: "2",
      title: "Fund your account",
      description: "Deposit funds using bank transfer, credit card, or crypto",
      icon: <Bitcoin className="w-8 h-8" />,
    },
    {
      number: "3",
      title: "Start trading",
      description:
        "Access multiple cryptocurrencies and start trading instantly",
      icon: <TrendingUp className="w-8 h-8" />,
    },
  ];

  const missionStats = [
    { value: 100, symbol: "+", label: "Supported Cryptocurrencies" },
    { value: 250, symbol: "K", label: "Active Traders" },
    { value: 99, symbol: ".9%", label: "Uptime Guarantee" },
  ];

  const plans = [
    {
      name: "Basic",
      price: "$0",
      period: "/month",
      description: "Perfect for beginners",
      features: [
        "Basic trading features",
        "Market analysis tools",
        "Email support",
        "Mobile app access",
        "Standard withdrawal limits",
      ],
    },
    {
      name: "Pro",
      price: "$29",
      period: "/month",
      description: "For active traders",
      features: [
        "Advanced trading features",
        "Real-time market data",
        "Priority support",
        "API access",
        "Higher withdrawal limits",
      ],
    },
    {
      name: "Enterprise",
      price: "$99",
      period: "/month",
      description: "For institutional traders",
      features: [
        "Custom trading solutions",
        "Institutional-grade tools",
        "Dedicated account manager",
        "Unlimited API access",
        "Custom withdrawal limits",
      ],
    },
  ];

  return (
    <div className="min-h-screen font-poppins bg-gradient-to-b from-background to-background/95">
      {/* Why Choose Us Section */}
      <section className="pt-0 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-sm uppercase tracking-wider text-primary mb-4">
              Why Choose Us
            </h2>
            <h3 className="text-4xl font-bold mb-8">
              Trade Crypto with Confidence
            </h3>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {whyChooseUs.map((item, index) => (
              <div
                key={index}
                className="group bg-background/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-border/50"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="bg-primary/10 p-4 rounded-full transform group-hover:scale-110 transition-transform duration-300">
                    <div className="text-primary">{item.icon}</div>
                  </div>
                  <h4 className="text-2xl font-bold">{item.title}</h4>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Step Guide */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-6 text-white">
            Start Trading in Minutes
          </h2>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            Begin your crypto journey with our simple three-step process
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-8xl mx-auto">
            {steps.map((step) => (
              <div
                key={step.number}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 hover:shadow-2xl hover:shadow-gray-600/10 transition-all border border-gray-800/50"
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <span className="text-7xl font-bold bg-gradient-to-b from-white to-white/10 text-transparent bg-clip-text">
                      {step.number}
                    </span>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="bg-gradient-to-br from-primary to-primary/5 rounded-full p-3 backdrop-blur-sm">
                      {React.cloneElement(step.icon, {
                        className: "w-6 h-6 text-white",
                      })}
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">
                  {step.title}
                </h3>
                <p className="text-gray-400">{step.description}</p>
                <div className="mt-6 flex items-center text-primary hover:text-primary/80 transition-colors cursor-pointer group">
                  <span className="text-sm font-medium text-green-600">
                    Learn more
                  </span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-16">Market Leadership</h2>
          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto mb-16">
            {missionStats.map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="text-5xl font-bold text-primary">
                  <CountUpAnimation end={stat.value} />
                  {stat.symbol}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20 bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">
            Trading Plans
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-8xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`border border-border/50 rounded-2xl p-8 hover:shadow-lg transition-shadow backdrop-blur-sm ${
                  plan.name === "Enterprise"
                    ? "bg-primary/5"
                    : "bg-background/50"
                }`}
              >
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground">{plan.description}</p>
                </div>
                <div className="text-4xl font-bold mb-8">
                  {plan.price}
                  <span className="text-lg text-muted-foreground">
                    {plan.period}
                  </span>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Check className="text-primary mr-3" size={20} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-lg font-medium transition-colors ${
                    plan.name === "Enterprise"
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : plan.name === "Pro"
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : plan.name === "Basic"
                      ? "bg-secondary text-secondary-foreground hover:bg-secondary/90"
                      : "bg-muted text-foreground hover:bg-muted/90"
                  }`}
                >
                  {plan.name === "Basic" ? "Get Started" : "Subscribe Now"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
