import { Card } from "@/components/ui/card";
import { CheckCircle, Target, Users, Award } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-white mb-6">About Us</h1>
          <p className="text-xl text-blue-100">
            Leading the Future of Education Management
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-8 h-8 text-blue-600" />
                <h2 className="text-3xl font-bold text-slate-900">
                  Our Mission
                </h2>
              </div>
              <p className="text-lg text-slate-600 leading-relaxed">
                To revolutionize education management by providing institutions
                with a modern, efficient, and user-friendly platform that
                streamlines administrative processes and enhances the overall
                educational experience for students and faculty.
              </p>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <Award className="w-8 h-8 text-blue-600" />
                <h2 className="text-3xl font-bold text-slate-900">
                  Our Vision
                </h2>
              </div>
              <p className="text-lg text-slate-600 leading-relaxed">
                To become the global leader in education management systems,
                empowering universities worldwide to deliver quality education
                through technology-driven solutions that are accessible,
                reliable, and innovative.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 text-center mb-12">
            Why Choose EMS?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: CheckCircle,
                title: "Easy to Use",
                description:
                  "Intuitive interface designed for both administrators and students",
              },
              {
                icon: Users,
                title: "Multi-User Support",
                description:
                  "Dedicated portals for students, admins, and faculty members",
              },
              {
                icon: Award,
                title: "Accurate Results",
                description: "Automatic grade calculation and CGPA computation",
              },
              {
                icon: Target,
                title: "Reliable Support",
                description: "24/7 customer support to help you succeed",
              },
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <Card key={idx} className="p-6 border border-slate-200">
                  <Icon className="w-10 h-10 text-blue-600 mb-4" />
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* History/Timeline */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 text-center mb-12">
            Our Journey
          </h2>

          <div className="space-y-8">
            {[
              {
                year: 2020,
                title: "Founded",
                description:
                  "EMS was established with a vision to modernize education management",
              },
              {
                year: 2021,
                title: "First Release",
                description:
                  "Launched our initial version supporting 5 universities",
              },
              {
                year: 2022,
                title: "Expansion",
                description:
                  "Extended support to 50+ institutions across multiple countries",
              },
              {
                year: 2023,
                title: "Innovation",
                description:
                  "Added AI-powered result analytics and predictive insights",
              },
              {
                year: 2025,
                title: "Global Leader",
                description:
                  "Now serving 500+ institutions with 100,000+ active users",
              },
            ].map((milestone, idx) => (
              <div key={idx} className="flex gap-6">
                <div className="shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-600 text-white font-bold">
                    {idx + 1}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {milestone.year} - {milestone.title}
                  </h3>
                  <p className="text-slate-600 mt-1">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 text-center mb-12">
            Meet Our Team
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "John Smith", role: "CEO & Founder", avatar: "JS" },
              { name: "Sarah Johnson", role: "CTO", avatar: "SJ" },
              { name: "Michael Chen", role: "Lead Developer", avatar: "MC" },
              { name: "Emma Wilson", role: "Product Manager", avatar: "EW" },
            ].map((member, idx) => (
              <Card
                key={idx}
                className="p-6 text-center border border-slate-200"
              >
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {member.avatar}
                </div>
                <h3 className="text-lg font-semibold text-slate-900">
                  {member.name}
                </h3>
                <p className="text-slate-600 text-sm mt-1">{member.role}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
