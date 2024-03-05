import { Appbar } from "../Components/Appbar";
import { BlogCard } from "../Components/BlogCard";

const Blogs = () => {
  return (
    <div>
      <Appbar />
      <div className="flex justify-center mt-4">
        <div className="max-w-xl">
          <BlogCard
            authorName={"Abhinil Nath"}
            title={
              "How an ugly single page website makes $5000 a month without affiliate marketing"
            }
            content={
              "A seemingly unattractive single-page website generating $5000 monthly without resorting to affiliate marketing is a fascinating case study in digital entrepreneurship. Despite lacking flashy design or extensive content, its success likely stems from niche relevance, effective monetization strategies, and streamlined user experience. Firstly, niche relevance plays a crucial role. The website likely caters to a specific audience with a pressing need or interest. By providing valuable, targeted content or services, it establishes itself as an authoritative resource within its niche, attracting a steady flow of organic traffic. Secondly, its monetization strategies are likely optimized for maximum revenue generation. This could involve offering premium content or services, implementing strategic advertising placements, or leveraging subscription models. By carefully balancing revenue streams with user experience, the website maximizes profitability without compromising quality."
            }
            publishedDate={"2021-10-10"}
            id={1}
          />
          <BlogCard
            authorName={"Abhinil Nath"}
            title={
              "How an ugly single page website makes $5000 a month without affiliate marketing"
            }
            content={
              "A seemingly unattractive single-page website generating $5000 monthly without resorting to affiliate marketing is a fascinating case study in digital entrepreneurship. Despite lacking flashy design or extensive content, its success likely stems from niche relevance, effective monetization strategies, and streamlined user experience. Firstly, niche relevance plays a crucial role. The website likely caters to a specific audience with a pressing need or interest. By providing valuable, targeted content or services, it establishes itself as an authoritative resource within its niche, attracting a steady flow of organic traffic. Secondly, its monetization strategies are likely optimized for maximum revenue generation. This could involve offering premium content or services, implementing strategic advertising placements, or leveraging subscription models. By carefully balancing revenue streams with user experience, the website maximizes profitability without compromising quality."
            }
            publishedDate={"2021-10-10"}
            id={1}
          />
          <BlogCard
            authorName={"Abhinil Nath"}
            title={
              "How an ugly single page website makes $5000 a month without affiliate marketing"
            }
            content={
              "A seemingly unattractive single-page website generating $5000 monthly without resorting to affiliate marketing is a fascinating case study in digital entrepreneurship. Despite lacking flashy design or extensive content, its success likely stems from niche relevance, effective monetization strategies, and streamlined user experience. Firstly, niche relevance plays a crucial role. The website likely caters to a specific audience with a pressing need or interest. By providing valuable, targeted content or services, it establishes itself as an authoritative resource within its niche, attracting a steady flow of organic traffic. Secondly, its monetization strategies are likely optimized for maximum revenue generation. This could involve offering premium content or services, implementing strategic advertising placements, or leveraging subscription models. By carefully balancing revenue streams with user experience, the website maximizes profitability without compromising quality."
            }
            publishedDate={"2021-10-10"}
            id={1}
          />
        </div>
      </div>
    </div>
  );
};

export default Blogs;
