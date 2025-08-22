"use client";

import { Button } from '@/components/ui/button';
import { Clock, MapPin, Truck } from 'lucide-react';

export default function DeliverySection() {
  return (
    <section className="bg-green-600 py-16 text-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">
              Produits Avicoles Frais - Livraison Rapide à Domicile
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Commandez avant 14h, livraison le jour même dans le Grand Dakar. 
              Transport réfrigéré pour garantir la fraîcheur.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5" />
                <span>Livraison en moins de 4 heures</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5" />
                <span>Couverture complète du Grand Dakar</span>
              </div>
              <div className="flex items-center gap-3">
                <Truck className="h-5 w-5" />
                <span>Véhicules réfrigérés et traçage GPS</span>
              </div>
            </div>
            
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
              Commencer les Achats
            </Button>
          </div>

          <div className="lg:text-right">
            <div className="bg-white/10 backdrop-blur rounded-2xl p-8 inline-block">
              <div className="text-6xl mb-4">🛵</div>
              <h3 className="text-2xl font-bold mb-2">Livraison Express</h3>
              <p className="opacity-90">
                Nos livreurs spécialisés garantissent la qualité de vos produits avicoles
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}