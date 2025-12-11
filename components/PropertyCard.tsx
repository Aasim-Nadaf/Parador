"use client";
import { Heart, Star } from "lucide-react";
import { useState } from "react";

interface PropertyCardProps {
  image: string;
  title: string;
  location: string;
  price: number;
  rating: number;
  reviewCount: number;
  type: string;
  isSuperhost?: boolean;
}

const PropertyCard = ({
  image,
  title,
  location,
  price,
  rating,
  reviewCount,
  type,
  isSuperhost = false,
}: PropertyCardProps) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <article className="group cursor-pointer">
      {/* Image Container */}
      <div className="relative aspect-4/5 rounded-2xl overflow-hidden mb-4">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-linear-to-t from-charcoal/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          className="absolute top-4 right-4 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
          aria-label={isLiked ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart
            className={`h-5 w-5 transition-colors ${
              isLiked ? "fill-accent text-accent" : "text-foreground"
            }`}
          />
        </button>

        {/* Superhost Badge */}
        {isSuperhost && (
          <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-background/90 backdrop-blur-sm">
            <span className="text-xs font-medium text-foreground">
              Superhost
            </span>
          </div>
        )}

        {/* Quick View on Hover */}
        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <button className="w-full py-3 rounded-xl bg-background/90 backdrop-blur-sm text-sm font-medium text-foreground hover:bg-background transition-colors">
            Quick View
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-1.5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              {type}
            </p>
            <h3 className="font-serif text-lg text-foreground leading-snug mt-1">
              {title}
            </h3>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <Star className="h-4 w-4 fill-accent text-accent" />
            <span className="text-sm font-medium text-foreground">
              {rating}
            </span>
            <span className="text-sm text-muted-foreground">
              ({reviewCount})
            </span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground">{location}</p>

        <p className="text-foreground">
          <span className="font-semibold">${price}</span>
          <span className="text-muted-foreground"> / night</span>
        </p>
      </div>
    </article>
  );
};

export default PropertyCard;
