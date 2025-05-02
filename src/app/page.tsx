import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GraduationCap, Loader, Paintbrush } from "lucide-react";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section with Parallax */}
      <section className="relative h-screen overflow-hidden">
        {/* Parallax Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/10 z-10" />
          <Image
            src="/hero.png"
            alt="Children learning background"
            fill
            className="object-cover"
            priority
            style={{ transform: "translateZ(-1px) scale(2)" }}
          />
        </div>

        {/* Content */}
        <div className="relative z-20 h-full flex items-center justify-center">
          <div className="container mx-auto px-4 text-center">
            <h1
              className={`${montserrat.className} text-5xl md:text-7xl font-bold text-white mb-6 animate-in`}
            >
              Nurturing Young Minds for a Brighter Future
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto">
              Give your child the best start in life with our innovative
              kindergarten learning platform. Interactive, fun, and educational!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300 transform hover:scale-105"
              >
                Get Instant Access
              </Link>
              <button className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300 transform hover:scale-105">
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2
            className={`${montserrat.className} text-4xl font-bold text-center mb-16`}
          >
            Why Parents Choose BrightBuddy
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl bg-card-background transition duration-300"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-50">
                  {feature.title}
                </h3>
                <p className="text-gray-50">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-blue-50 py-20">
        <div className="container mx-auto px-4">
          <h2
            className={`${montserrat.className} text-4xl font-bold text-center mb-16`}
          >
            Benefits for Your Child
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    {benefit.icon}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2
            className={`${montserrat.className} text-4xl font-bold text-center mb-16`}
          >
            What Parents Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-testimonial-card-background p-8 rounded-xl"
              >
                <div className="flex items-center mb-6">
                  <Avatar>
                    <AvatarImage src="/logo.png" />
                    <AvatarFallback>{testimonial.name}</AvatarFallback>
                  </Avatar>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-50">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-50">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-50 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className={`${montserrat.className} text-4xl font-bold mb-8`}>
            Ready to Give Your Child the Best Start?
          </h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto">
            Join thousands of parents who trust BrightBuddy for their children's
            early education.
          </p>
          <form className="max-w-md mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <button
                type="submit"
                className="bg-yellow-500 text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-yellow-400 transition duration-300"
              >
                Get Started
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

const features = [
  {
    title: "Interactive Learning",
    description:
      "Engaging activities that make learning fun and memorable for your child.",
    icon: <GraduationCap className="text-amber-50 w-30 h-30" />,
  },
  {
    title: "Progress Tracking",
    description:
      "Monitor your child's development with detailed progress reports.",
    icon: <Loader className="text-amber-50 w-30 h-30" />,
  },
  {
    title: "Expert-Designed Curriculum",
    description:
      "Age-appropriate content developed by early education experts.",
    icon: <Paintbrush className="text-amber-50 w-30 h-30" />,
  },
];

const benefits = [
  {
    title: "Cognitive Development",
    description:
      "Enhance problem-solving skills and critical thinking through interactive exercises.",
    icon: "🧠",
  },
  {
    title: "Social Skills",
    description:
      "Foster collaboration and communication through group activities.",
    icon: "👥",
  },
  {
    title: "Creative Expression",
    description:
      "Encourage imagination and artistic abilities through creative projects.",
    icon: "🎨",
  },
  {
    title: "Early Literacy",
    description:
      "Build strong foundations in reading and writing through fun activities.",
    icon: "📖",
  },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Parent of Two",
    quote:
      "BrightBuddy has transformed how my children learn. They're always excited to start their daily activities!",
    avatar: "/testimonial1.png",
  },
  {
    name: "Michael Chen",
    role: "Parent",
    quote:
      "The progress tracking feature helps me understand exactly how my child is developing. It's amazing!",
    avatar: "/testimonial2.png",
  },
  {
    name: "Emily Rodriguez",
    role: "Mother",
    quote:
      "The curriculum is so well designed. My daughter has shown remarkable improvement in her skills.",
    avatar: "/testimonial3.png",
  },
];
