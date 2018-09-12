package com.example.zaneburton.diced20;

import android.media.MediaPlayer;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageView;

import java.util.Random;

public class MainActivity extends AppCompatActivity {
    private ImageView imageViewDice;
    private Random rng = new Random();

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        final MediaPlayer diceRoll = MediaPlayer.create(this, R.raw.dicerolllol);

        imageViewDice = findViewById(R.id.image_view_dice);
        imageViewDice.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                rollDice();
                diceRoll.start();
            }
        });
    }

    private void rollDice() {
        int randomNumber = rng.nextInt(20) + 1;
        final MediaPlayer gameover = MediaPlayer.create(this, R.raw.hit);
        final MediaPlayer miss = MediaPlayer.create(this, R.raw.miss);


        switch(randomNumber) {
            case 1:
                imageViewDice.setImageResource(R.drawable.dice1);
                miss.start();
                break;
            case 2:
                imageViewDice.setImageResource(R.drawable.dice2);
                break;
            case 3:
                imageViewDice.setImageResource(R.drawable.dice3);
                break;
            case 4:
                imageViewDice.setImageResource(R.drawable.dice4);
                break;
            case 5:
                imageViewDice.setImageResource(R.drawable.dice5);
                break;
            case 6:
                imageViewDice.setImageResource(R.drawable.dice6);
                break;
            case 7:
                imageViewDice.setImageResource(R.drawable.dice7);
                break;
            case 8:
                imageViewDice.setImageResource(R.drawable.dice8);
                break;
            case 9:
                imageViewDice.setImageResource(R.drawable.dice9);
                break;
            case 10:
                imageViewDice.setImageResource(R.drawable.dice10);
                break;
            case 11:
                imageViewDice.setImageResource(R.drawable.dice11);
                break;
            case 12:
                imageViewDice.setImageResource(R.drawable.dice12);
                break;
            case 13:
                imageViewDice.setImageResource(R.drawable.dice13);
                break;
            case 14:
                imageViewDice.setImageResource(R.drawable.dice14);
                break;
            case 15:
                imageViewDice.setImageResource(R.drawable.dice15);
                break;
            case 16:
                imageViewDice.setImageResource(R.drawable.dice16);
                break;
            case 17:
                imageViewDice.setImageResource(R.drawable.dice17);
                break;
            case 18:
                imageViewDice.setImageResource(R.drawable.dice18);
                break;
            case 19:
                imageViewDice.setImageResource(R.drawable.dice19);
                break;
            case 20:
                imageViewDice.setImageResource(R.drawable.dice20);
                gameover.start();
                break;

        }
    }
}
