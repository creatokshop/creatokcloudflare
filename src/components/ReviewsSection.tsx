import { Star } from "lucide-react";

export const ReviewsSection = () => {
  const reviews = [
    {
      initials: "JD",
      name: "John D.",
      location: "Los Angeles, CA",
      review:
        "I was skeptical at first, but after receiving the account I followed discord instructions they sent me and started promoting gym products, I'm completely sold.Its been 3 months now generating 2k in commissions going great totally recommend.",
      rating: 5,
      date: "March 15, 2025",
    },
    {
      initials: "SM",
      name: "Sarah M.",
      location: "London, UK",
      review:
        "Delivery was faster than expected, I contacted the team on email and received a 5k account in minutes all the programs fully open no need for verification. The quality exceeded my expectations and the price was reasonable compared to alternatives.Team showed me the method to get high views from Creativity rewards program and it has been a nice profit every month just from the views.",
      rating: 4,
      date: "April 22, 2025",
    },
    {
      initials: "RK",
      name: "Robert K.",
      location: "Chicago, IL",
      review:
        "Ordered a US account 30k followers and received it in an instant. When it arrived, everything was clean and account was ready to work on with my personal content.Looking forward to buy 5 accounts getting an income from each of the accounts.",
      rating: 5,
      date: "February 3, 2025",
    },
    {
      initials: "AL",
      name: "Amy L.",
      location: "Toronto, Canada",
      review:
        "I got a 15k account even though I wanted a 30k account,I spoke with the team and got a replacement instantly.They were very helpful,Verified US Account made it possible for me to use the program from Canada thank you Creatok!",
      rating: 5,
      date: "April 10, 2025",
    },
    {
      initials: "MB",
      name: "Michael B.",
      location: "Sydney, Australia",
      review:
        "As someone who's tried similar services before, this one stands out for reliability. Had a small issue with one item, but their replacement policy was hassle-free.",
      rating: 4,
      date: "March 28, 2025",
    },
    {
      initials: "TH",
      name: "Tanya H.",
      location: "Berlin, Germany",
      review:
        "The user interface made ordering simple even though English isn't my first language. Everything was clearly explained and the product quality is excellent.",
      rating: 5,
      date: "April 5, 2025",
    },
  ];

  return (
    <section className="py-8 sm:py-10 px-3 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center bg-gradient-to-r from-cyan-400 via-rose-500 to-cyan-400 bg-clip-text text-transparent">
          Client Reviews
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {reviews.map((review, index) => (
            <div key={index} className="bg-gray-900 p-4 rounded-lg">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-cyan-500 to-rose-500 flex items-center justify-center font-bold text-sm">
                  {review.initials}
                </div>
                <div className="ml-3">
                  <div className="font-bold text-sm">{review.name}</div>
                  <div className="text-gray-400 text-xs">{review.location}</div>
                </div>
              </div>

              <div className="flex mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    fill={i < review.rating ? "#FFD700" : "none"}
                    color={i < review.rating ? "#FFD700" : "#6B7280"}
                  />
                ))}
              </div>

              <p className="text-gray-300 text-xs">"{review.review}"</p>

              <div className="text-gray-400 text-xs mt-1">{review.date}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
