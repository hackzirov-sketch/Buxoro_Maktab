import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MapPin, GraduationCap, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { z } from "zod";

const formSchema = z.object({
  phone: z.string().min(12, "Telefon raqam to'liq emas"), // simplistic validation
  location: z.string().min(1, "Manzilni tanlang"),
  grade: z.string().min(1, "Sinfni tanlang")
});

export default function ApplicationForm() {
  const [formData, setFormData] = useState({
    phone: "+998",
    location: "",
    grade: ""
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const locations = ["Bekobod shahar", "Shirin shahar", "Juma", "Xos", "Zafar"];
  const grades = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"];

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (!val.startsWith("+998")) {
      val = "+998";
    }
    // simple digits only mask
    const cleaned = val.replace(/[^\d+]/g, '');
    if (cleaned.length <= 13) {
      setFormData(prev => ({ ...prev, phone: cleaned }));
      setErrors(prev => ({ ...prev, phone: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      formSchema.parse(formData);
      setErrors({});
      setIsSubmitting(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Reset after 3s
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({ phone: "+998", location: "", grade: "" });
      }, 3000);
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach(err => {
          if (err.path[0]) {
            newErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(newErrors);
      }
    }
  };

  return (
    <section className="py-32 relative overflow-hidden" id="ariza">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-xl mx-auto"
        >
          <div className="p-8 md:p-12 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-2xl relative shadow-[0_0_50px_rgba(0,0,0,0.3)]">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-[50px] pointer-events-none"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-500/20 rounded-full blur-[50px] pointer-events-none"></div>

            <div className="text-center mb-10 relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold font-poppins text-white mb-4">
                Ariza <span className="text-primary drop-shadow-[0_0_10px_rgba(74,222,128,0.3)]">Topshirish</span>
              </h2>
              <p className="text-white/70">
                Farzandingiz kelajagi uchun ilk qadamni tashlang. Ma'lumotlaringizni qoldiring, biz siz bilan bog'lanamiz.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80 ml-1">Telefon raqam</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
                    <Phone className="w-5 h-5" />
                  </div>
                  <motion.input
                    animate={errors.phone ? { x: [-10, 10, -10, 10, 0] } : {}}
                    transition={{ duration: 0.4 }}
                    type="tel"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    className={`w-full bg-black/40 border ${errors.phone ? "border-red-500" : "border-white/10 focus:border-primary/50"} rounded-xl py-4 pl-12 pr-4 text-white outline-none focus:ring-1 focus:ring-primary/50 transition-all`}
                    placeholder="+998 90 123 45 67"
                    data-testid="input-phone"
                  />
                </div>
                {errors.phone && <p className="text-red-400 text-sm ml-1 flex items-center gap-1"><AlertCircle className="w-4 h-4"/> {errors.phone}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80 ml-1">Manzil</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <motion.select
                    animate={errors.location ? { x: [-10, 10, -10, 10, 0] } : {}}
                    transition={{ duration: 0.4 }}
                    value={formData.location}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, location: e.target.value }));
                      setErrors(prev => ({ ...prev, location: "" }));
                    }}
                    className={`w-full bg-black/40 border ${errors.location ? "border-red-500" : "border-white/10 focus:border-primary/50"} rounded-xl py-4 pl-12 pr-4 text-white outline-none focus:ring-1 focus:ring-primary/50 transition-all appearance-none cursor-pointer`}
                    data-testid="select-location"
                  >
                    <option value="" disabled className="text-gray-500">Hududni tanlang</option>
                    {locations.map(loc => (
                      <option key={loc} value={loc} className="bg-gray-900 text-white">{loc}</option>
                    ))}
                  </motion.select>
                </div>
                {errors.location && <p className="text-red-400 text-sm ml-1 flex items-center gap-1"><AlertCircle className="w-4 h-4"/> {errors.location}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80 ml-1">Farzandingiz sinfi</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <motion.select
                    animate={errors.grade ? { x: [-10, 10, -10, 10, 0] } : {}}
                    transition={{ duration: 0.4 }}
                    value={formData.grade}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, grade: e.target.value }));
                      setErrors(prev => ({ ...prev, grade: "" }));
                    }}
                    className={`w-full bg-black/40 border ${errors.grade ? "border-red-500" : "border-white/10 focus:border-primary/50"} rounded-xl py-4 pl-12 pr-4 text-white outline-none focus:ring-1 focus:ring-primary/50 transition-all appearance-none cursor-pointer`}
                    data-testid="select-grade"
                  >
                    <option value="" disabled className="text-gray-500">Sinfni tanlang</option>
                    {grades.map(grade => (
                      <option key={grade} value={grade} className="bg-gray-900 text-white">{grade}-sinf</option>
                    ))}
                  </motion.select>
                </div>
                {errors.grade && <p className="text-red-400 text-sm ml-1 flex items-center gap-1"><AlertCircle className="w-4 h-4"/> {errors.grade}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-4 bg-primary text-black font-bold text-lg py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 hover:shadow-[0_0_30px_rgba(74,222,128,0.5)] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed group relative overflow-hidden"
                data-testid="button-submit-form"
              >
                <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                {isSubmitting ? (
                  <div className="w-6 h-6 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                ) : (
                  <>
                    Yuborish <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            <AnimatePresence>
              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute inset-0 z-20 bg-background/90 backdrop-blur-md rounded-[2rem] flex flex-col items-center justify-center p-8 text-center border border-primary/30"
                >
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-6"
                  >
                    <CheckCircle2 className="w-10 h-10 text-primary" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-2">Arizangiz qabul qilindi!</h3>
                  <p className="text-white/70">Operatorlarimiz tez orada siz bilan bog'lanishadi.</p>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </motion.div>
      </div>
    </section>
  );
}