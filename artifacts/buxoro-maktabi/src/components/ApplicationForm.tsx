import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MapPin, GraduationCap, Send, CheckCircle2, AlertCircle, User, BookOpen, School } from "lucide-react";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  firstName: z.string().min(2, "Ismingizni kiriting").max(50, "Ism 50 belgidan oshmasligi kerak"),
  lastName: z.string().min(2, "Familiyangizni kiriting").max(50, "Familiya 50 belgidan oshmasligi kerak"),
  phone: z.string().regex(/^\+998\d{9}$/, "Telefon raqam +998xxxxxxxxx formatida bo'lishi kerak"),
  childFirstName: z.string().min(2, "Bola ismini kiriting").max(50, "Bola ismi 50 belgidan oshmasligi kerak"),
  childLastName: z.string().min(2, "Bola familiyasini kiriting").max(50, "Bola familiyasi 50 belgidan oshmasligi kerak"),
  currentSchool: z.string().min(2, "Hozirgi maktabni kiriting").max(100, "Maktab nomi 100 belgidan oshmasligi kerak"),
  graduatedClass: z.string().min(1, "Sinfni tanlang"),
  applyingClass: z.string().min(1, "Sinfni tanlang"),
  region: z.string().min(1, "Hududni tanlang"),
});

const grades = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"];
const regions = ["Bekobod shahar", "Shirin shahar", "Juma", "Xos", "Zafar"];

function Field({ label, icon: Icon, children, error }: { label: string; icon: any; children: React.ReactNode; error?: string }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-white/80 ml-1">{label}</label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none z-10">
          <Icon className="w-5 h-5" />
        </div>
        {children}
      </div>
      {error && <p className="text-red-400 text-sm ml-1 flex items-center gap-1"><AlertCircle className="w-4 h-4 shrink-0" /> {error}</p>}
    </div>
  );
}

export default function ApplicationForm() {
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", phone: "+998",
    childFirstName: "", childLastName: "",
    currentSchool: "", graduatedClass: "", applyingClass: "", region: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const update = (field: string, val: string) => {
    setFormData(prev => ({ ...prev, [field]: val }));
    setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (!val.startsWith("+998")) val = "+998";
    const cleaned = val.replace(/[^\d+]/g, '');
    if (cleaned.length <= 13) update("phone", cleaned);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      formSchema.parse(formData);
      setErrors({});
      setIsSubmitting(true);
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Xatolik yuz berdi");
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({
          firstName: "", lastName: "", phone: "+998",
          childFirstName: "", childLastName: "",
          currentSchool: "", graduatedClass: "", applyingClass: "", region: "",
        });
      }, 3000);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach(err => {
          if (err.path[0]) newErrors[err.path[0].toString()] = err.message;
        });
        setErrors(newErrors);
      } else {
        toast({
          title: "Xatolik yuz berdi",
          description: "Serverga ulanishda muammo. Iltimos, qaytadan urinib ko'ring yoki +998 94 835 66 66 raqamiga qo'ng'iroq qiling.",
          variant: "destructive",
        });
      }
      setIsSubmitting(false);
    }
  };

  const shake = (field: string) => errors[field] ? { x: [-10, 10, -10, 10, 0] } : {};

  const inputClass = (field: string) =>
    `w-full bg-black/40 border ${errors[field] ? "border-red-500/70" : "border-white/10 focus:border-primary/50"} rounded-xl py-4 pl-12 pr-4 text-white outline-none focus:ring-2 focus:ring-primary/20 transition-all`;

  const selectClass = (field: string) => inputClass(field) + " appearance-none cursor-pointer";

  return (
    <section className="py-28 md:py-32 relative overflow-hidden" id="ariza">
      <div className="absolute top-1/3 -right-48 w-96 h-96 bg-primary/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/3 -left-48 w-80 h-80 bg-emerald-500/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="p-6 md:p-10 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-2xl relative shadow-[0_0_50px_rgba(0,0,0,0.3)]">
            <div className="text-center mb-8 relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold font-poppins text-white mb-4">
                Ariza <span className="text-primary">Topshirish</span>
              </h2>
              <p className="text-white/70 text-sm md:text-base leading-relaxed">
                Farzandingiz kelajagi uchun ilk qadamni tashlang. Ma'lumotlaringizni qoldiring, biz siz bilan bog'lanamiz.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Ismingiz" icon={User} error={errors.firstName}>
                  <motion.input animate={shake("firstName")} type="text" value={formData.firstName}
                    onChange={e => update("firstName", e.target.value)}
                    className={inputClass("firstName")} placeholder="Ismingiz" />
                </Field>
                <Field label="Familiyangiz" icon={User} error={errors.lastName}>
                  <motion.input animate={shake("lastName")} type="text" value={formData.lastName}
                    onChange={e => update("lastName", e.target.value)}
                    className={inputClass("lastName")} placeholder="Familiyangiz" />
                </Field>
              </div>

              <Field label="Telefon raqam" icon={Phone} error={errors.phone}>
                <motion.input animate={shake("phone")} type="tel" value={formData.phone}
                  onChange={handlePhoneChange}
                  className={inputClass("phone")} placeholder="+998 90 123 45 67" />
              </Field>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Bolaning ismi" icon={GraduationCap} error={errors.childFirstName}>
                  <motion.input animate={shake("childFirstName")} type="text" value={formData.childFirstName}
                    onChange={e => update("childFirstName", e.target.value)}
                    className={inputClass("childFirstName")} placeholder="Bola ismi" />
                </Field>
                <Field label="Bolaning familiyasi" icon={GraduationCap} error={errors.childLastName}>
                  <motion.input animate={shake("childLastName")} type="text" value={formData.childLastName}
                    onChange={e => update("childLastName", e.target.value)}
                    className={inputClass("childLastName")} placeholder="Bola familiyasi" />
                </Field>
              </div>

              <Field label="Hozirgi o'qish joyi (maktab)" icon={School} error={errors.currentSchool}>
                <motion.input animate={shake("currentSchool")} type="text" value={formData.currentSchool}
                  onChange={e => update("currentSchool", e.target.value)}
                  className={inputClass("currentSchool")} placeholder="Maktab nomi" />
              </Field>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Tugatgan sinfi" icon={BookOpen} error={errors.graduatedClass}>
                  <motion.select animate={shake("graduatedClass")} value={formData.graduatedClass}
                    onChange={e => update("graduatedClass", e.target.value)}
                    className={selectClass("graduatedClass")}>
                    <option value="" disabled className="text-gray-500">Sinfni tanlang</option>
                    {grades.map(g => <option key={g} value={g} className="bg-gray-900 text-white">{g}-sinf</option>)}
                  </motion.select>
                </Field>
                <Field label="Qabul qilinadigan sinf" icon={GraduationCap} error={errors.applyingClass}>
                  <motion.select animate={shake("applyingClass")} value={formData.applyingClass}
                    onChange={e => update("applyingClass", e.target.value)}
                    className={selectClass("applyingClass")}>
                    <option value="" disabled className="text-gray-500">Sinfni tanlang</option>
                    {grades.map(g => <option key={g} value={g} className="bg-gray-900 text-white">{g}-sinf</option>)}
                  </motion.select>
                </Field>
              </div>

              <Field label="Hudud" icon={MapPin} error={errors.region}>
                <motion.select animate={shake("region")} value={formData.region}
                  onChange={e => update("region", e.target.value)}
                  className={selectClass("region")}>
                  <option value="" disabled className="text-gray-500">Hududni tanlang</option>
                  {regions.map(r => <option key={r} value={r} className="bg-gray-900 text-white">{r}</option>)}
                </motion.select>
              </Field>

              <motion.button
                type="submit" disabled={isSubmitting}
                whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(74,222,128,0.25)" }}
                whileTap={{ scale: 0.97 }}
                className="w-full mt-4 bg-primary text-black font-bold text-base md:text-lg py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-[1.2s] ease-out" />
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                ) : (
                  <>Yuborish <Send className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" /></>
                )}
              </motion.button>
            </form>

            <AnimatePresence>
              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute inset-0 z-20 bg-background/90 backdrop-blur-md rounded-[2rem] flex flex-col items-center justify-center p-8 text-center border border-primary/30"
                >
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2, stiffness: 200, damping: 18 }}
                    className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10 text-primary" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-2">Arizangiz qabul qilindi!</h3>
                  <p className="text-white/70 text-sm">Operatorlarimiz tez orada siz bilan bog'lanishadi.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
