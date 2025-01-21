import React from "react";
import Header from "../_components/section-header";
import Footer from "../_components/section-footer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const newsItems = [
  {
    id: 1,
    title: "Ethereum 2.0 Upgrade Shows Promising Results",
    preview: "The latest network upgrade has significantly reduced energy consumption while improving transaction speeds...",
    timeAgo: "1 hour ago",
    link: "/news/ethereum-upgrade",
    image: "/images/news/latest-news-1.png" 
  },
  {
    id: 2,
    title: "New Crypto Regulations in EU",
    preview: "European Union announces comprehensive framework for cryptocurrency regulation...",
    timeAgo: "20 hours ago",
    link: "/news/eu-regulations",
    image: "images/news/latest-news-2.jpg" 
  },
  {
    id: 3,
    title: "Major Bank Adopts Blockchain",
    preview: "Leading financial institution implements blockchain technology for cross-border payments...",
    timeAgo: "15 minutes ago",
    link: "/news/bank-blockchain",
    image: "images/news/latest-news-3.jpg" 
  }
];


export default function NewsPage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Header />
      
      <div className="container mx-auto px-8 py-12 mt-20 space-y-12">
        {/* News Category Indicator */}
        <div className="flex items-center justify-center gap-2">
          <span className="w-2 h-2 bg-primary rounded-full"></span>
          <span className="text-primary font-medium">News</span>
        </div>

        {/* Featured News */}
        <div className="space-y-8 text-center">
          <h1 className="text-7xl font-bold">Bitcoin Price Milestone or Volatility</h1>
          <h2 className="text-xl text-muted-foreground">Bitcoin Hits Record High: $100,000 in Reach</h2>
          
          {/* Featured Image */}
          <div className="relative w-full aspect-[2/1] rounded-xl overflow-hidden">
            <img 
              src="images/news/breaking-news.jpg"
              alt="Bitcoin price chart with Bitcoin logo"
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* Latest News Section */}
        <div className="space-y-8">
          <h3 className="text-4xl font-bold">Latest News</h3>
          
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent>
              {newsItems.map((news) => (
                <CarouselItem key={news.id} className="md:basis-2/3 lg:basis-1/2">
                  <Card className="border border-border/50">
                    <CardContent className="p-6 space-y-4">
                      <h4 className="text-2xl font-semibold">{news.title}</h4>
                      <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                        <img 
                          src={news.image}
                          alt={news.title}
                          className="object-contain w-full h-full hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <p className="text-muted-foreground">{news.preview}</p>
                    </CardContent>
                    <CardFooter className="p-5 flex justify-between items-center border-t">
                      <span className="text-sm text-muted-foreground">{news.timeAgo}</span>
                      <a 
                        href={news.link} 
                        className="flex items-center text-sm text-primary hover:text-primary/80 transition-colors"
                      >
                        View article
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </a>
                    </CardFooter>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>

      <Footer />
    </main>
  );
}