"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, X } from 'lucide-react';

export default function VoiceAssistant() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Voice Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="lg"
          className="bg-green-600 hover:bg-green-700 rounded-full h-14 w-14 shadow-lg animate-pulse"
          onClick={() => setIsOpen(true)}
        >
          <Mic className="h-6 w-6" />
        </Button>
      </div>

      {/* Voice Assistant Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full relative">
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>

            <div className="text-center">
              <div className="bg-green-100 rounded-full h-20 w-20 mx-auto mb-4 flex items-center justify-center">
                <Mic className="h-10 w-10 text-green-600" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Assistant Vocal Wolof
              </h3>
              
              <p className="text-gray-600 mb-6">
                Dites ce que vous cherchez en wolof ou en français
              </p>

              <div className="bg-green-50 rounded-lg p-4 mb-6">
                <p className="text-green-700 font-medium mb-2">Exemples de commandes:</p>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>"Fooré ma poulet bu baax" (Je veux un bon poulet)</p>
                  <p>"Ban là moy poussin gi gën a sant?" (Où sont les meilleurs poussins?)</p>
                  <p>"Commander aliments pour mes poules"</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button className="flex-1 bg-green-600 hover:bg-green-700">
                  🎤 Parler maintenant
                </Button>
                <Button variant="outline" className="flex-1">
                  Annuler
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}