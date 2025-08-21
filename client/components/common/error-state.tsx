import Image from "next/image";

export function ErrorState() {
  return (
    <div className="flex items-center justify-center h-[400px] flex-col">
      <div className="w-[100px] h-[100px] bg-accent rounded-full flex items-center justify-center p-4">
        <Image
          src="/images/error.png"
          alt="Error State"
          width={75}
          height={75}
        />
      </div>
      <div className="text-muted-foreground text-center mt-4">
        خطا در دریافت اطلاعات
      </div>
    </div>
  );
}
