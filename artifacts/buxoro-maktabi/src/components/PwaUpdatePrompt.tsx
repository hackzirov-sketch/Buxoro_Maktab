import { useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

export default function PwaUpdatePrompt() {
  const { toast } = useToast();
  const shownRef = useRef(false);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    let refreshing = false;
    const onControllerChange = () => {
      if (refreshing) return;
      refreshing = true;
      window.location.reload();
    };

    navigator.serviceWorker.addEventListener("controllerchange", onControllerChange);

    navigator.serviceWorker.ready.then((registration) => {
      const showUpdate = (worker: ServiceWorker) => {
        if (shownRef.current) return;
        shownRef.current = true;
        toast({
          title: "Yangi versiya tayyor",
          description: "Sayt yangilangan. Eng so'nggi ma'lumotlarni ko'rish uchun sahifani yangilang.",
          action: (
            <ToastAction altText="Yangilash" onClick={() => worker.postMessage({ type: "SKIP_WAITING" })}>
              Yangilash
            </ToastAction>
          ),
        });
      };

      if (registration.waiting) {
        showUpdate(registration.waiting);
      }

      registration.addEventListener("updatefound", () => {
        const worker = registration.installing;
        if (!worker) return;
        worker.addEventListener("statechange", () => {
          if (worker.state === "installed" && navigator.serviceWorker.controller) {
            showUpdate(worker);
          }
        });
      });
    }).catch(() => undefined);

    return () => {
      navigator.serviceWorker.removeEventListener("controllerchange", onControllerChange);
    };
  }, [toast]);

  return null;
}
