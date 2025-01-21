// import React from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";

// export default function SectionFeatures() {
//   return (
//     <section className="container mx-auto flex flex-col gap-20 items-center">
//       <h2 className="font-black text-xl md:text-2xl lg:text-4xl text-center">
//         Powering the world&apos;s leading brands
//       </h2>
//       <Carousel
//         opts={{
//           align: "start",
//         }}
//         className="w-full max-w-sm"
//       >
//         <CarouselContent>
//           {Array.from({ length: 5 }).map((_, index) => (
//             <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
//               <div className="p-1">
//                 <Card>
//                   <CardContent className="flex aspect-square items-center justify-center p-6">
//                     <span className="text-3xl font-semibold">{index + 1}</span>
//                   </CardContent>
//                 </Card>
//               </div>
//             </CarouselItem>
//           ))}
//         </CarouselContent>
//         <CarouselPrevious />
//         <CarouselNext />
//       </Carousel>
//     </section>
   
//   );
// }


import React from 'react';
import { ArrowRight, Shield, Zap } from 'lucide-react';

const CTASection = () => {
  const features = [
    {
      icon: <Shield className="w-6 h-6" />,
      text: "Bank-grade encryption & secure storage"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      text: "Lightning-fast transactions & execution"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-700">
      <div className="container mx-auto px-4">
        <div className="max-w-8xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Start Your Journey Today
              </h2>
              <p className="text-xl text-gray-400">
                Join thousands of traders worldwide and experience the future of trading with our advanced platform.
              </p>
              
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3 text-gray-300">
                    <div className="bg-primary/20 p-2 rounded-lg">
                      {feature.icon}
                    </div>
                    <span>{feature.text}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center">
                  Get Started Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
                <button className="px-8 py-4 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors">
                  View Pricing Plans
                </button>
              </div>
            </div>

            {/* Right Column - Stats */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800/50">
              <div className="grid grid-cols-2 gap-8">
                <div className="text-center p-6 bg-gray-900/50 rounded-xl">
                  <div className="text-4xl font-bold text-primary mb-2">$2B+</div>
                  <div className="text-gray-400">Trading Volume</div>
                </div>
                <div className="text-center p-6 bg-gray-900/50 rounded-xl">
                  <div className="text-4xl font-bold text-primary mb-2">180+</div>
                  <div className="text-gray-400">Countries</div>
                </div>
                <div className="text-center p-6 bg-gray-900/50 rounded-xl">
                  <div className="text-4xl font-bold text-primary mb-2">1M+</div>
                  <div className="text-gray-400">Users</div>
                </div>
                <div className="text-center p-6 bg-gray-900/50 rounded-xl">
                  <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                  <div className="text-gray-400">Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;