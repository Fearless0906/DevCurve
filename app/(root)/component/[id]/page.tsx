import DialogForm from "@/components/DialogForm";
import { getComponentById } from "@/data/django/schema";
import { Eye, Heart } from "lucide-react";
import Image from "next/image";

export default async function ComponentDetails({
  params,
}: {
  params: { id: string };
}) {
  const item = await getComponentById(params.id);

  if (!item) {
    return (
      <p className="text-center text-muted-foreground">Component not found.</p>
    );
  }

  return (
    <div className="wrapper pt-32 pb-8">
      <div className="container">
        <section className="flex flex-col gap-6 w-full">
          {/* Thumbnail */}
          <div className="relative w-full h-[400px] rounded-xl overflow-hidden">
            <Image
              src={item.thumbnail ?? "/assets/images/placeholder.jpg"}
              alt={item.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Title and Info */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h1 className="text-3xl font-bold">{item.title}</h1>
            {item.react && <Heart className="w-6 h-6 text-pink-500" />}
          </div>

          <p className="text-lg text-muted-foreground">{item.description}</p>

          <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2">
            <Eye className="w-4 h-4" />
            <span>{item.views.toLocaleString()} views</span>
          </div>

          {/* Guide Section */}
          <div className="mt-12">
            <div className="flex items-center justify-between mb-8 w-full">
              <h2 className="text-3xl font-bold">Project Guide</h2>
              <div>
                <DialogForm projectId={item.id} />
              </div>
            </div>
            <div className="space-y-12">
              {item.guides.map((guide, index) => (
                <div key={guide.id} className="pb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                      Chapter {index + 1}
                    </span>
                    <h3 className="text-xl font-semibold">{guide.topic}</h3>
                  </div>
                  <div className="prose prose-neutral dark:prose-invert max-w-none">
                    {guide.content &&
                      guide.content
                        .replace(/\r\n/g, "\n")
                        .split(/\n\s*\n/)
                        .map((paragraph, idx) => (
                          <p
                            key={idx}
                            className="text-muted-foreground leading-relaxed mb-6 last:mb-0"
                          >
                            {paragraph.split("\n").map((line, lineIdx) => (
                              <span
                                key={lineIdx}
                                className="block mb-2 last:mb-0"
                              >
                                {line.trim()}
                              </span>
                            ))}
                          </p>
                        ))}

                    {guide.commands ? (
                      <div className="mt-6 bg-muted p-4 rounded-lg">
                        <pre className="text-sm overflow-x-auto">
                          {guide.commands.split("\n").map((cmd, idx) => (
                            <code key={idx} className="block text-primary">
                              $ {cmd.trim()}
                            </code>
                          ))}
                        </pre>
                      </div>
                    ) : (
                      guide.image && (
                        <div className="mt-6 flex justify-center w-full">
                          <Image
                            src={guide.image}
                            alt={`Illustration for ${guide.topic}`}
                            width={440}
                            height={200}
                            className="rounded-lg"
                          />
                        </div>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
