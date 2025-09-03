// import { BookOpen, Users, Award, Building } from "lucide-react";
// import { Card, CardContent } from "../components/ui/card";

// const highlights = [
//   {
//     icon: BookOpen,
//     title: "Academic Excellence",
//     description: "Providing quality primary education for 100 years with innovative teaching methods and comprehensive curriculum development.",
//   },
//   {
//     icon: Users,
//     title: "Student Development",
//     description: "Nurturing young minds through holistic education, character building, and extracurricular activities for well-rounded development.",
//   },
//   {
//     icon: Award,
//     title: "Centenary Legacy",
//     description: "Celebrating a remarkable journey of educational excellence and countless success stories spanning a full century.",
//   },
//   {
//     icon: Building,
//     title: "Infrastructure",
//     description: "Modern facilities combined with traditional values, providing an optimal learning environment for our students.",
//   },
// ];

export const SchoolDescription = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="tiro-bangla-regular text-4xl md:text-5xl mb-6">
            আমাদের বিদ্যালয় সম্বন্ধে
          </h2>
          <div className="w-24 h-1 bg-gradient-accent mx-auto mb-8"></div>
          <p className="tiro-bangla-regular text-justify text-lg md:text-2xl max-w-5xl mx-auto leading-relaxed">
            দেওয়ানগঞ্জ প্রাথমিক বিদ্যালয়। এটি ১৯২৫ সালে প্রতিষ্ঠিত। বিদ্যালয়টি নওয়া দেওয়ান কমিটির অধীন দাগলাডীয়া গ্রাম পঞ্চায়েতের অন্তর্গত নওয়ামিল্লা গ্রামে অবস্থিত। বিদ্যালয়ে বর্তমানে শিক্ষক করিমত আলীসহ মোট ১১৪ জন শিক্ষার্থী অধ্যয়নরত। তৎকালীন বিদ্যালয় প্রতিষ্ঠায় স্থানীয় গ্রামবাসী, শিক্ষকগণ ও বিভিন্ন প্রশাসনিক কর্মকর্তার সহযোগিতায় অত্র বিদ্যালয়টি প্রতিষ্ঠিত হয়।
বিদ্যালয়ের পক্ষ থেকে ছাত্র-ছাত্রীদের বিদ্যালয়ের শিক্ষালাভের জন্য আন্তরিক শুভেচ্ছা ও অভিনন্দন।

          </p>
        </div>

        {/* Highlights Grid */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {highlights.map((highlight, index) => (
            <Card key={index} className="card-academic hover:shadow-elegant transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <div className="mb-4">
                  <highlight.icon className="h-12 w-12 text-primary mx-auto" />
                </div>
                <h3 className="heading-academic text-xl mb-3">
                  {highlight.title}
                </h3>
                <p className="text-academic text-sm">
                  {highlight.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div> */}

        {/* Main Description */}
        {/* <div className="bg-card rounded-2xl shadow-academic p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="heading-academic text-3xl mb-6">
                A Century of Educational Excellence
              </h3>
              <div className="space-y-4 text-academic">
                <p>
                  Our journey began in 1925 with a vision to provide accessible, 
                  quality primary education to children in our community. Over the 
                  past 100 years, we have evolved while maintaining our core values 
                  of academic excellence, character development, and inclusive learning.
                </p>
                <p>
                  Our dedicated faculty and staff work tirelessly to create an 
                  environment where every child can thrive. We believe in nurturing 
                  not just academic prowess but also creativity, critical thinking, 
                  and social responsibility in our students.
                </p>
                <p>
                  As we celebrate our centenary, we remain committed to our founding 
                  principles while embracing modern educational approaches to prepare 
                  our students for the challenges and opportunities of tomorrow.
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-primary rounded-xl p-8 text-center text-primary-foreground">
              <h4 className="text-2xl font-bold mb-6">Our Achievements</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <div className="text-4xl font-bold text-accent mb-2">100</div>
                  <div className="text-sm">Years of Service</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-accent mb-2">1000+</div>
                  <div className="text-sm">Alumni Network</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-accent mb-2">50+</div>
                  <div className="text-sm">Dedicated Teachers</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-accent mb-2">500+</div>
                  <div className="text-sm">Current Students</div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};